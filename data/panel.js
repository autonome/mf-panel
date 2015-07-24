window.addEventListener("message", function(event) {
  // fuck you CPOWs!
  try {
    var data = JSON.parse(event.data);
    if (data.name == 'counts') {
      /*
      var container = document.querySelector('.mdl-navigation');
      var mfCounts = data.data
      var mfNames = Object.keys(mfCounts)
      var tpl = document.querySelector('#mf-item')
      mfNames.forEach(function(mfName) {
        var link = tpl.querySelector('.mdl-navigation__link')
        link.textContent = mfName + '(' + mfCounts[mfName] + ')'
        var clone = document.importNode(tpl.content, true);
        container.appendChild(clone);
      })
      */

      document.querySelector('iframe').src = 'http://pin13.net/mf2/?url=' + data.url;
    }
  } catch(ex) {}
})
