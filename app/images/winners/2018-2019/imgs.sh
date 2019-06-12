cd $1
ls | awk -v cct=$1 -F$'\t' '{print "\"""/images/winners/2018-2019/"cct"/"$1"\""","}'
