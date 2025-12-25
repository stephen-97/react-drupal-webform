const fs = require("fs");
const path = require("path");

function copyFiles(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    const items = fs.readdirSync(src, { withFileTypes: true });

    for (const item of items) {
        const srcPath = path.join(src, item.name);
        const destPath = path.join(dest, item.name);

        if (item.isDirectory()) {
            copyFiles(srcPath, destPath);
        } else if (item.name.endsWith(".scss")) {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyFiles(path.join(__dirname, "src"), path.join(__dirname, "dist"));
