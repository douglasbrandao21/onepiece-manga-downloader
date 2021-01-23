for i in *
do
[ -d "$i" ] && zip -r "$i.zip" "$i"
done
