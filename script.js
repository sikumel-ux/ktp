const fileDiri = document.getElementById('fileDiri');
const previewDiri = document.getElementById('previewDiri');

fileDiri.onchange = () => {
  const [file] = fileDiri.files;
  if (file) {
    previewDiri.src = URL.createObjectURL(file);
    previewDiri.style.display = 'block';
  }
};

document.getElementById('wargaForm').onsubmit = function(e) {
  e.preventDefault();
  if(document.getElementById('nik').value.length !== 16) return alert("NIK harus 16 digit!");

  const btn = document.getElementById('btn-kirim');
  btn.disabled = true;
  btn.innerText = "Mengunggah data...";

  // Di GitHub ini hanya referensi, eksekusi tetap di server GAS
  google.script.run
    .withSuccessHandler(res => {
      if(res === "Sukses") {
        document.getElementById('res-nama').innerText = document.getElementById('nama').value;
        document.getElementById('res-nik').innerText = "NIK " + document.getElementById('nik').value;
        document.getElementById('res-alamat').innerText = document.getElementById('alamat').value;
        document.getElementById('ktp-foto-render').src = previewDiri.src;

        document.getElementById('form-container').style.display = 'none';
        document.getElementById('ktp-card').style.display = 'block';
        document.getElementById('download-btn').style.display = 'block';
      } else {
        alert(res);
        btn.disabled = false;
        btn.innerText = "Simpan & Cetak";
      }
    })
    .processForm(this);
};

function downloadCard() {
  html2canvas(document.getElementById('ktp-card')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'KTP_Digital_' + document.getElementById('res-nama').innerText + '.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
