ambilDataBuku()   
.then((buku) => {     
    console.log("Data buku:", buku);   
})   
.catch((error) => {     
    console.error("Error:", error);   
});    


function ambilDataBuku() {   
    return new Promise((resolve) => {     
        setTimeout(() => {       
            resolve({ judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer" 
            });     
        }, 1500);   
    }); 
}  

async function tampilkanBuku() {   
    console.log("Mengambil data buku...");   
    const buku = await ambilDataBuku();   
    console.log("Data buku:", buku); 
}  

tampilkanBuku(); 