echo "=================== Stopping & removing old container... ==================="
bash remove.sh
echo "=================== Building image... ==================="
bash build.sh
echo "=================== Starting container... ==================="
bash run.sh

echo "=================== Started container :) ==================="

