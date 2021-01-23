#!/bin/bash

from=${from:-1}
to=${to:-2}

while [ $# -gt 0 ]; do
   if [[ $1 == *"--"* ]]; then
        param="${1/--/}"
        declare $param="$2"
   fi
  shift
done

for((i=$from; i<=$to; i++))
do
  node index.js $i
done