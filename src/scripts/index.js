chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == 'getColors') {
        sendResponse({ data: getColors() })
    }
})

function getColors() {
    var props = {
        textColors: [],
        bgColors: [],
    }
    var elems = [...document.querySelectorAll('*')].map(el => {
        let computedStyle = window.getComputedStyle(el)
        let color = computedStyle.color
        let bg = computedStyle.backgroundColor
        if (!props.textColors.includes(color)) {
            props.textColors.push(color)
        }
        if (!props.bgColors.includes(bg)) {
            props.bgColors.push(bg)
        }
    })

    props.textColors = props.textColors.sort((a, b) => {
        let aL = rgbToHsl(a)[0]
        let bL = rgbToHsl(b)[0]
        return aL > bL ? 1 : -1
    })

    props.bgColors = props.bgColors.sort((a, b) => {
        let aL = rgbToHsl(a)[0]
        let bL = rgbToHsl(b)[0]
        return aL > bL ? 1 : -1
    })

    return props
}

function rgbToHsl(color) {
    let rgba = color.match(/[\d\.]+/g)
    let r = rgba[0]
    let g = rgba[1]
    let b = rgba[2]
    ;(r /= 255), (g /= 255), (b /= 255)

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b)
    var h,
        s,
        l = (max + min) / 2

    if (max == min) {
        h = s = 0 // achromatic
    } else {
        var d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }

        h /= 6
    }

    return [h, s, l]
}
