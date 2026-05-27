function prosesData(judul, callback) {   
    console.log(`Memproses buku "${judul}"...`);   
    const hasil = judul.toUpperCase();   
    callback(hasil); 
}
prosesData("Laskar Pelangi", function(hasil) {   
    console.log("Hasil:", hasil); // Hasil: LASKAR PELANGI 
});  

// Callback dalam operasi asynchronous 
setTimeout(function() {   
    console.log("Data buku berhasil dimuat setelah 2 detik"); 
}, 2000); 