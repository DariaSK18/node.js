async function deleteCar(id) {
    try {
        const res = await fetch('/cars', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({id})
        })
        // console.log(res.status)
        if(res.ok) {
            // location.reload()
            window.location.href = '/cars'
        }
    } catch (error) {
        console.log(error);
        
    }
}

function handleImgInput(event) {
    const file = event.target.files[0]
    if(file) {
        const imgEl = document.getElementById('carImg')
        const reader = new FileReader()
        reader.onload = function(e) {
            imgEl.src = e.target.result
        }
        reader.readAsDataURL(file)
    }
}