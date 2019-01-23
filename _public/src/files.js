// Author: Kaden Griffith

const $ = require('kbrew_hypertxt');

require('../css/files.scss');

module.exports = {
  load: fb => {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        $.add($.get('#root'), $.getElement({
          tag: 'a',
          "aria-label": 'Profile',
          id: 'profile',
          class: 'link',
          href: '/profile',
          alt: 'Profile',
          contains: $.icon({
            icon: 'user-circle'
          })
        }));

        loadFiles();

        $.get('#file').addEventListener('change', () => {
          let file = $.get('#file').files[0],
            reader = new FileReader();
          reader.onloadend = () => {
            upload(file);
          };
          reader.onerror = err => displayMessage(`e:Could not upload file.`);
          reader.readAsDataURL(file);
        });

        toggleLoading(false);
      } else {
        location.href = '/profile';
      }
    });

    function loadFiles() {
      $.clear($.get('#files-container'));
      $.get('#loading-files').innerHTML = 'Loading...';
      $.get('#loading-files').classList.remove('hidden');
      $.get('#files-container').classList.add('hidden');

      fb.search({
        collection: 'users',
        key: 'email',
        value: fb.auth.currentUser.email
      }).then(results => {
        if (results[0].data.files && results[0].data.files.length > 0) {
          results[0].data.files.forEach(file => {
            $.add($.get('#files-container'), $.getElement({
              class: 'file',
              contains: $.getElement({
                class: 'file-name',
                contains: file.name
              }) + $.icon({
                icon: 'info-circle',
                class: 'file-date',
                "data-time": `Uploaded On: ${file.timestamp.toDate()}`
              }) + $.getElement({
                class: 'grid',
                contains: $.icon({
                  icon: 'trash-alt',
                  class: 'file-delete',
                  onclick: `deleteFile('${file.path}');`
                }) + $.icon({
                  icon: 'download',
                  class: 'file-download',
                  onclick: `downloadFile('${file.path}');`
                })
              })
            }));
          });
          $.get('#loading-files').classList.add('hidden');
          $.get('#files-container').classList.remove('hidden');
        } else {
          $.add($.get('#files-container'), $.getElement({
            class: 'end',
            contains: 'No Files Found.'
          }));
          $.get('#loading-files').classList.add('hidden');
          $.get('#files-container').classList.remove('hidden');
        }
      }).catch(err => {
        $.get('#files-container').classList.add('hidden');
        $.get('#loading-files').innerHTML = `Please try again later.<br>Contact support if this continues to occur.`;
        $.get('#loading-files').classList.remove('hidden');
        displayMessage(`e:Could not load files.`);
      });
    }

    window.downloadFile = path => {
      let filename = path.split('/')[1],
        folder = path.split('/')[0];
      fb.storage.ref(folder).child(filename)
        .getDownloadURL()
        .then(downloadURL => {
          $.add($.get('#root'), $.getElement({
            tag: 'a',
            "aria-label": 'Download link',
            alt: 'Download link',
            class: 'offscreen',
            href: downloadURL,
            id: 'download-link',
            target: 'new',
            download: filename
          }));
          setTimeout(() => {
            $.get('#download-link').click();
            removeElement($.get('#download-link'));
            displayMessage(`s:Download starting...`);
          }, 200);
        }).catch(err => {
          displayMessage(`e:Could not download file.`);
        });
      return false;
    };

    window.deleteFile = path => {
      if (confirm(`Deleting is permanent. Are you sure?`)) {
        toggleLoading(true, 'Deleting...');
        fb.storage.ref().child(path).delete().then(() => {
          fb.search({
            collection: 'users',
            key: 'email',
            value: fb.auth.currentUser.email
          }).then(results => {
            if (results[0]) {
              let User = results[0],
                userFiles = User.data.files;

              userFiles = userFiles.filter(i => i.path != path);

              fb.update('users', User.key, {
                files: userFiles
              }).then(() => {
                loadFiles();
                toggleLoading(false);
                displayMessage(`s:File was deleted.`);
              }).catch(err => {
                toggleLoading(false);
                displayMessage(`e:${err.message}`);
              });
            }
          }).catch(err => {
            toggleLoading(false);
            displayMessage(`e:Could not update account.`);
          });
        }).catch(err => {
          toggleLoading(false);
          displayMessage(`e:Could not delete file.`);
        });
      }
      return false;
    };

    window.upload = file => {
      toggleLoading(true, 'Uploading...');
      fb.search({
        collection: 'users',
        key: 'email',
        value: fb.auth.currentUser.email
      }).then(results => {
        let User = results[0],
          path = `${User.key}/${file.name}`,
          userFiles = User.data.files ? User.data.files : [];

        fb.storage.ref().child(path).put(file)
          .then(() => {
            userFiles.unshift({
              name: file.name,
              timestamp: new Date(),
              account: User.key,
              path
            });
            fb.update('users', User.key, {
              files: userFiles
            }).then(() => {
              location.href = '/files';
            }).catch(err => {
              toggleLoading(false);
              displayMessage(`e:${err.message}`);
            });
          }).catch(err => {
            toggleLoading(false);
            displayMessage(`e:${err.message}`);
          });
      }).catch(err => {
        toggleLoading(false);
        displayMessage(`e:Could not upload file.`);
      });
    };

    function removeElement(el) {
      if (el) el.parentNode.removeChild(el);
    }
  }
};