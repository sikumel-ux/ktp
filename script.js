<script>
  const form = document.getElementById('wargaForm');
  const fileInput = document.getElementById('fileInput');
  const preview = document.getElementById('preview');

  fileInput.onchange = () => {
    const [file] = fileInput.files;
    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.style.display = 'block';
    }
  };

  form.onsubmit = function(e) {
    e.preventDefault();
    if(document.getElementById('nikInput').value.length !== 16) return alert("NIK harus 16 digit!");

    document.getElementById('btn-kirim').disabled = true;
    document.getElementById('btn-kirim').innerText = "Sedang Mengirim...";

    google.script.run
      .withSuccessHandler(res => {
        if(res === "Sukses") {
          document.getElementById('res-nama').innerText = form.nama.value;
          document.getElementById('res-nik').innerText = "NIK " + form.nik.value;
          document.getElementById('res-alamat').innerText = form.alamat.value;
          document.getElementById('ktp-foto-render').src = preview.src;

          document.getElementById('form-container').style.display = 'none';
          document.getElementById('ktp-card').style.display = 'block';
          document.getElementById('download-btn').style.display = 'block';
        } else {
          alert(res);
          document.getElementById('btn-kirim').disabled = false;
        }
      })
      .processForm(this);
  };

  function downloadCard() {
    html2canvas(document.getElementById('ktp-card')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'KTP_Digital.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }
</script>
