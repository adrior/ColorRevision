chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getColors' }, function(
        response
    ) {
        placeColors(response.data)
    })
})

function placeColors(data) {
    let list = document.getElementById('colorsList')
    list.innerHTML = '<div class="demo__header">Текст</div>'
    data.textColors.map(color => {
        list.innerHTML += `
        <div class="demo__color">
          <span class="demo__plateBg">
            <span class="demo__plate" style="background: ${color};"></span>  
          </span>
          <span class="demo__label">${color}</span>
        </div>
    `
    })
    list.innerHTML += '<div class="demo__header">Фон</div>'
    data.bgColors.map(color => {
        list.innerHTML += `
        <div class="demo__color">
          <span class="demo__plateBg">
            <span class="demo__plate" style="background: ${color};"></span>  
          </span>
          <span class="demo__label">${color}</span>
        </div>
    `
    })
    window.resizeTo(500, 500)
}
