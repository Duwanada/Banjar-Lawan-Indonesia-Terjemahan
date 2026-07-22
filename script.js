/* ==========================================
   BANJAR LAWAN INDONESIA
   SCRIPT.JS

   BAGIAN 1
   PENCARIAN KAMUS & KATEGORI
========================================== */


/* ==========================================
   VARIABEL GLOBAL
========================================== */

let soalSekarang = null;

let jawabanBenar = "";

let skor = 0;

let nomorSoal = 1;

const maksimalSoal = 5;



/* ==========================================
   FUNGSI PENCARIAN KATA
========================================== */


function cariKata(){


    let input = document
        .getElementById("kataInput")
        .value
        .toLowerCase()
        .trim();



    let hasil =
    document.getElementById("hasil");



    if(input === ""){


        hasil.innerHTML = `

            <h3>
            ⚠️ Kata masih kosong
            </h3>


            <p>
            Silakan ketik kosakata terlebih dahulu.
            </p>

        `;


        return;

    }



    let ditemukan =
    kamus.find(function(item){


        return item.banjar.toLowerCase() === input;


    });



    if(ditemukan){


        hasil.innerHTML = `


        <div class="hasil-box">


            <img

            src="${ditemukan.gambar}"

            alt="${ditemukan.banjar}">


            <div class="info">


                <h2>
                ${ditemukan.banjar}
                </h2>



                <p>

                <b>
                Bahasa Indonesia :
                </b>

                ${ditemukan.indonesia}

                </p>



                <p>

                <b>
                Kategori :
                </b>

                ${ditemukan.kategori}

                </p>




                <p>

                <b>
                Contoh Kalimat :
                </b>

                <br>

                ${ditemukan.contoh}

                </p>




                <p>

                <b>
                Audio Pengucapan :
                </b>

                </p>



                <audio controls>


                    <source

                    src="${ditemukan.audio}"

                    type="audio/mp4">


                </audio>



            </div>


        </div>


        `;


        animasiHasil();



    }else{


        hasil.innerHTML = `


            <h3>
            😥 Kata tidak ditemukan
            </h3>


            <p>
            Coba gunakan kosakata lain.
            </p>


        `;


    }



}




/* ==========================================
   TEKAN ENTER UNTUK MENCARI
========================================== */


document
.getElementById("kataInput")
.addEventListener(
"keypress",
function(event){


    if(event.key === "Enter"){


        cariKata();


    }


});





/* ==========================================
   MENAMPILKAN KATEGORI
========================================== */


function tampilKategori(namaKategori){


    let hasil =
    document.getElementById("hasil");



    let dataKategori =
    kamus.filter(function(item){


        return item.kategori === namaKategori;


    });



    if(dataKategori.length === 0){


        hasil.innerHTML = `


        <h3>
        Belum ada data kategori ini.
        </h3>


        `;


        return;


    }




    let html = "";



    dataKategori.forEach(function(item){



        html += `


        <div class="hasil-box">


            <img

            src="${item.gambar}"

            alt="${item.banjar}">



            <div class="info">


                <h2>

                ${item.banjar}

                </h2>



                <p>

                <b>
                Bahasa Indonesia :
                </b>

                ${item.indonesia}

                </p>



                <p>

                <b>
                Contoh :
                </b>

                <br>

                ${item.contoh}

                </p>



                <audio controls>


                    <source

                    src="${item.audio}"

                    type="audio/mp4">


                </audio>


            </div>


        </div>


        <hr>


        `;



    });



    hasil.innerHTML = html;


    animasiHasil();


}/* ==========================================
   SCRIPT.JS BAGIAN 2

   GAME TEBAK GAMBAR
========================================== */



/* ==========================================
   MEMBUAT SOAL BARU
========================================== */


function soalBaru(){



    // memilih data kosakata secara acak

    soalSekarang =
    kamus[
        Math.floor(
            Math.random() * kamus.length
        )
    ];



    // menyimpan jawaban benar

    jawabanBenar =
    soalSekarang.banjar;



    // menampilkan gambar soal

    let gambar =
    document.getElementById("gambarGame");



    if(gambar){


        gambar.src =
        soalSekarang.gambar;


        gambar.alt =
        soalSekarang.banjar;


    }




    // nomor soal

    let nomor =
    document.getElementById("nomorSoal");



    if(nomor){


        nomor.innerHTML =

        "Soal " +

        nomorSoal +

        " dari " +

        maksimalSoal;


    }




    // membuat pilihan jawaban

    let pilihan = [

        jawabanBenar

    ];





    while(pilihan.length < 4){



        let acak =

        kamus[

            Math.floor(

            Math.random() *

            kamus.length

            )

        ].banjar;





        if(

        !pilihan.includes(acak)

        ){


            pilihan.push(acak);


        }



    }




    // mengacak pilihan

    pilihan.sort(function(){


        return Math.random() - 0.5;


    });





    // menampilkan pilihan

    let html = "";




    pilihan.forEach(function(item){



        html += `


        <label>


            <input

            type="radio"

            name="jawaban"

            value="${item}">


            ${item}



        </label>



        `;



    });




    let areaPilihan =

    document.getElementById("pilihan");



    if(areaPilihan){


        areaPilihan.innerHTML = html;


    }





    // menghapus pesan lama


    let pesan =

    document.getElementById("pesan");



    if(pesan){


        pesan.innerHTML = "";


        pesan.className = "";


    }



}






/* ==========================================
   MEMERIKSA JAWABAN
========================================== */


function cekJawaban(){



    let pilihanUser =

    document.querySelector(

    'input[name="jawaban"]:checked'

    );





    let pesan =

    document.getElementById("pesan");





    if(!pilihanUser){



        pesan.innerHTML = `


        <p>

        ⚠️ Silakan pilih jawaban terlebih dahulu.

        </p>


        `;


        return;


    }






    if(

    pilihanUser.value === jawabanBenar

    ){



        skor++;




        pesan.innerHTML = `


        <h3>

        🎉 Jawaban Benar!

        </h3>



        <p>

        Hebat, kamu berhasil!

        </p>



        `;



        pesan.classList.add("benar");



        suaraBenar();





    }else{





        pesan.innerHTML = `



        <h3>

        ❌ Jawaban Salah

        </h3>




        <p>

        Jawaban yang benar adalah:

        <b>

        ${jawabanBenar}

        </b>


        </p>



        `;




        pesan.classList.add("salah");



        suaraSalah();



    }






    // update skor


    document

    .getElementById("skor")

    .innerHTML =


    "Skor : " + skor;





}/* ==========================================
   SCRIPT.JS BAGIAN 3

   PENYELESAIAN GAME &
   INTERAKSI WEBSITE
========================================== */


/* ==========================================
   SOAL BERIKUTNYA
========================================== */


function lanjutSoal(){



    if(nomorSoal < maksimalSoal){



        nomorSoal++;


        soalBaru();



    }else{



        selesaiGame();



    }



}







/* ==========================================
   MENAMPILKAN HASIL AKHIR
========================================== */


function selesaiGame(){



    let game =

    document.getElementById("game");





    game.innerHTML = `



    <div class="hasil-game">



        <h2>

        🏆 Permainan Selesai

        </h2>




        <p>

        Kamu berhasil menjawab:

        <b>

        ${skor}

        </b>

        dari

        <b>

        ${maksimalSoal}

        </b>

        soal.

        </p>




        <button onclick="ulangGame()">



            🔄 Main Lagi



        </button>




    </div>



    `;



}







/* ==========================================
   MENGULANG GAME
========================================== */


function ulangGame(){



    skor = 0;


    nomorSoal = 1;





    let game =

    document.getElementById("game");





    game.innerHTML = `



        <h2 class="judul">

        🎮 Permainan Tebak Gambar

        </h2>




        <div class="game-box">



            <div class="progress">


                <span id="nomorSoal">

                Soal 1 dari 5

                </span>



            </div>




            <div class="gambar-game">



                <img

                id="gambarGame"

                src="gambar/default.png"

                alt="Gambar Soal">



            </div>




            <h3 id="pertanyaan">

            Apa Bahasa Banjar dari gambar di atas?

            </h3>




            <div id="pilihan">

            </div>




            <button onclick="cekJawaban()">

            ✅ Jawab

            </button>




            <button onclick="lanjutSoal()">

            ➡️ Soal Berikutnya

            </button>




            <p id="pesan">

            </p>




            <div class="score-box">


            <span id="skor">

            Skor : 0

            </span>



            </div>



        </div>



    `;




    soalBaru();



}







/* ==========================================
   ANIMASI HASIL
========================================== */


function animasiHasil(){



    let box =

    document.querySelector(".hasil-box");




    if(box){



        box.classList.add("muncul");



    }



}







/* ==========================================
   SUARA FEEDBACK
========================================== */


function suaraBenar(){



    let audio =

    new Audio(

        "audio/benar.mp3"

    );



    audio.play();



}







function suaraSalah(){



    let audio =

    new Audio(

        "audio/salah.mp3"

    );



    audio.play();



}







/* ==========================================
   CEK KETERSEDIAAN AUDIO
========================================== */


function cekAudio(){



    let semuaAudio =

    document.querySelectorAll("audio");





    semuaAudio.forEach(function(audio){



        audio.onerror = function(){



            console.log(

            "Audio belum tersedia:",

            audio.src

            );



        };



    });



}







/* ==========================================
   WEBSITE SIAP DIGUNAKAN
========================================== */


document.addEventListener(

"DOMContentLoaded",

function(){



    cekAudio();





    let gambarGame =

    document.getElementById(

        "gambarGame"

    );





    if(gambarGame){



        soalBaru();



    }



});