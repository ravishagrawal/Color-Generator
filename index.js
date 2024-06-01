document.getElementById("submit").addEventListener('click', function(e) {
    e.preventDefault();
    
    const colorInput = document.getElementById("color-selector").value.slice(1);
    let selectedMode = document.querySelector('#mode');
    const output = selectedMode.options[selectedMode.selectedIndex].value;
    const colorName = document.getElementById("color-name");
    
    colorName.innerHTML = ""; 
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorInput}&mode=${output}&count=6`)
        .then(response => response.json())
        .then(data => {
            const colors = data.colors;
            const hexValues = colors.map(color => color.hex.value); 
            
            updateBackgroundColors(hexValues);
            displayColorNames(hexValues, colorName);
            
        });
    
    
});

function updateBackgroundColors(hexValues) {
    hexValues.forEach((hexValue, index) => {
        document.getElementById(`color-bg-${index + 1}`).style.backgroundColor = hexValue;
    });
}

function displayColorNames(hexValues, colorNameElement) {
    
    for (let color of hexValues){
        colorNameElement.innerHTML += `<div class="color-type" data-hex= "${color}"><p>${color}</p></div>`;
    }
}

document.addEventListener('click', function(e) {
    const targetDiv = e.target.closest('.color-type');
    if (targetDiv) {
        console.log(targetDiv.dataset.hex); // Log the hex value
        copyToClipboard(targetDiv.dataset.hex);
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert(`Copied to clipboard: ${text}`);
    })
}


