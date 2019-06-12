# Convertir todos los pngs a jpg
```
mogrify -format jpg *.png
```

# Bajar la calidad a todos los jpgs
```
mogrify -quality 80 *.jpg
```

# formatear el nombre
```
rename 's/ /_/g' *
```

# formatear nombres en modo listado para agregarlos al script
```
./imgs.sh CCT
```
