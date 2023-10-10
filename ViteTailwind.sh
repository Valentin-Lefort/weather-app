#!/bin/bash
# Install tailwind in empty basic project or in a vite project

# Variables:
cssBaseFolder="css"
cssBaseFile="style.css"
cssTailwindFolder="dist"
cssTailwindFile="style.css"
configContentBase="['./**/*.{html,js}']"
configContentViteVanilla="['./index.html','./**/*.{js,ts,jsx,tsx}',]"
configContentViteReact="['./index.html','./src/**/*.{js,ts,jsx,tsx}',]"

# Check for vite
echo "Are you in a vite project? y/n: "
read isVite
while [[ "$isVite" != "n" && "$isVite" != "y" ]]; do
  echo "Wrong answer try again"
  echo "Are you in a vite project? y/n: "
  read isVite
done

if [ "$isVite" == "n" ]; then
# Script for basic project:
touch index.html
npm init -y
npm install -D tailwindcss
npx tailwindcss init
sed -i "\|content|s|\[.*\]|$configContentBase|" tailwind.config.js
mkdir $cssBaseFolder
touch $cssBaseFile
mv $cssBaseFile $cssBaseFolder
echo "@tailwind base;" > $cssBaseFolder/$cssBaseFile
echo "@tailwind components;" >> $cssBaseFolder/$cssBaseFile
echo "@tailwind utilities;" >> $cssBaseFolder/$cssBaseFile
sed -i '7 s/.*/\t\t"Watch": "'"npx tailwindcss -i .\/$cssBaseFolder\/$cssBaseFile -o .\/$cssTailwindFolder\/$cssTailwindFile --watch"'"/g' package.json
npx tailwindcss -i ./$cssBaseFolder/$cssBaseFile -o ./$cssTailwindFolder/$cssTailwindFile --watch

else

echo "Type v for vanilla or r for React: "
read typeProject
while [[ "$typeProject" != "v" && "$typeProject" != "r" ]]; do
  echo "Wrong answer try again"
  echo "Type v for vanilla or r for React: "
  read typeProject
done

if [ "$typeProject" == "v" ]; then
# Script for vite Vanilla project:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
sed -i "\|content|s|\[.*\]|$configContentViteVanilla|" tailwind.config.js
echo "@tailwind base;" > ./style.css
echo "@tailwind components;" >> ./style.css
echo "@tailwind utilities;" >> ./style.css

fi

if [ "$typeProject" == "r" ]; then
# Script for React project
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
sed -i "\|content|s|\[.*\]|$configContentViteReact|" tailwind.config.js
echo "@tailwind base;" > ./src/index.css
echo "@tailwind components;" >> ./src/index.css
echo "@tailwind utilities;" >> ./src/index.css

fi

fi