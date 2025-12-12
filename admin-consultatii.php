<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <title>Admin - Cereri Consultație</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <h2 style="text-align:center; margin-top: 30px;">Cereri Consultație Telefonică</h2>
  <div class="container" style="max-width:800px;margin:auto;">
    <table class="table table-bordered" id="consultatiiTable">
      <thead class="table-light">
        <tr>
          <th>ID</th>
          <th>Nume</th>
          <th>Telefon</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <!-- Cererile vor fi afișate aici -->
      </tbody>
    </table>
    <div id="adminMsg" class="text-center"></div>
  </div>
  <script>
    fetch('api/admin-consultatii.php')
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector('#consultatiiTable tbody');
        if (Array.isArray(data) && data.length > 0) {
          tbody.innerHTML = data.map(row => `
            <tr>
              <td>${row.id}</td>
              <td>${row.nume}</td>
              <td>${row.telefon}</td>
              <td>${row.data ? row.data.replace('T', ' ').substring(0, 19) : ''}</td>
            </tr>
          `).join('');
        } else {
          document.getElementById('adminMsg').textContent = 'Nu există cereri înregistrate.';
        }
      })
      .catch(() => {
        document.getElementById('adminMsg').textContent = 'Eroare la încărcarea cererilor!';
      });
  </script>
</body>
</html>
