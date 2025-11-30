# Instalare Node.js

## Problema
Eroarea `npm : The term 'npm' is not recognized` înseamnă că Node.js nu este instalat sau nu este în PATH.

## Soluție: Instalează Node.js

### Pasul 1: Descarcă Node.js

1. Deschide browserul și accesează: https://nodejs.org/
2. Descarcă versiunea **LTS** (Long Term Support) - recomandată
3. Alege versiunea pentru Windows (fișier `.msi`)

### Pasul 2: Instalează Node.js

1. Rulează fișierul descărcat (de exemplu: `node-v20.x.x-x64.msi`)
2. Click pe **Next** prin toți pașii
3. **IMPORTANT:** Asigură-te că opțiunea **"Add to PATH"** este bifată (de obicei este implicit)
4. Click pe **Install**
5. Așteaptă finalizarea instalării
6. Click pe **Finish**

### Pasul 3: Verifică instalarea

1. **Închide și redeschide PowerShell** (sau Command Prompt)
2. Navighează la folderul proiectului:
   ```bash
   cd D:\TravelTur
   ```
3. Verifică că Node.js este instalat:
   ```bash
   node --version
   ```
   Ar trebui să vezi ceva de genul: `v20.x.x`

4. Verifică că npm este instalat:
   ```bash
   npm --version
   ```
   Ar trebui să vezi ceva de genul: `10.x.x`

### Pasul 4: Instalează dependențele proiectului

După ce Node.js este instalat, rulează:

```bash
cd D:\TravelTur
npm install
```

### Pasul 5: Pornește serverul

```bash
npm start
```

---

## Dacă Node.js este deja instalat dar nu funcționează

### Verifică PATH-ul

1. Apasă **Win + R**
2. Tastează: `sysdm.cpl` și apasă Enter
3. Click pe tab-ul **Advanced**
4. Click pe **Environment Variables**
5. În **System Variables**, găsește **Path**
6. Verifică că există:
   - `C:\Program Files\nodejs\`
   - Sau locația unde ai instalat Node.js

### Reinstalează Node.js

Dacă PATH-ul este corect dar tot nu funcționează, reinstalează Node.js.

---

## Verificare rapidă

După instalare, în PowerShell:

```bash
node --version
npm --version
```

Ambele comenzi ar trebui să returneze numere de versiune.

