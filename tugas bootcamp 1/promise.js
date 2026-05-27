// Callback dalam operasi asynchronous 
setTimeout(function() {   
    console.log("Data buku berhasil dimuat setelah 2 detik"); 
}, 2000);  

function ambilDataBuku() {   
    return new Promise((resolve, reject) => {     
        setTimeout(() => {       
            const berhasil = true; // ubah ke false untuk simulasi gagal        
            
            if (berhasil) {         
                resolve({ judul: "Laskar Pelangi", penulis: "Andrea Hirata" });       
            } else {         
                reject("Gagal mengambil data buku");       
            }     
        }, 1500);   
    }); 
}  

ambilDataBuku()   
.then((buku) => {     
    console.log("Data buku:", buku);   
}) 
  .catch((error) => {     
    console.error("Error:", error);   
});  