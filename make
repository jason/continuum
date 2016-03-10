gulp chinese
gulp html
sed -i .bak 's/eng-/chn-/g' build/ch/index.html
./rsynccsf
ssh i5labs ./copycsf
