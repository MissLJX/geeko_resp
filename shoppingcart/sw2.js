/**
 * Created by shao_ on 2017/9/29.
 */

self.addEventListener('install', function (event) {
  console.log('service worker is installed..')
})

this.addEventListener('fetch', function (event) {
  // it can be empty if you just want to get rid of that error
})
