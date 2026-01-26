async function deleteBook(id) {
    try {
        const res = await fetch('/books', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({id})
        })
        console.log(res.status)
        if(res.ok) {
            location.reload()
        }
    } catch (error) {
        console.log(error);
        
    }
}