// async function deleteBook(id) {
//     try {
//         const res = await fetch('/books', {
//             method: 'DELETE',
//             headers: {'content-type': 'application/json'},
//             body: JSON.stringify({id})
//         })
//         console.log(res.status)
//         if(res.ok) {
//             // location.reload()
//             window.location.href = '/books'
//         }
//     } catch (error) {
//         console.log(error);
        
//     }
// }