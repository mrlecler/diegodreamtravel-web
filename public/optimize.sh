#!/usr/bin/env bash
# optimize.sh — optimiza imágenes de Diego Dream Travel
#
# Lee los originales de  ./images/hero/   (imageNN.* o nombres arbitrarios)
# y escribe optimizados en ./images/opt/  (-2560.jpg, -2560.webp, -1280.webp)
#
# Uso:
#   ./optimize.sh 29                          # una imagen: images/hero/image29.jpeg
#   ./optimize.sh 29 30 31                    # varias
#   ./optimize.sh all                         # todas las imageNN.* en images/hero/
#   ./optimize.sh force 05                    # reprocesa aunque ya exista en opt/
#   ./optimize.sh name quinceaneras01         # nombre arbitrario (.{jpg,jpeg,png,webp})
#   ./optimize.sh name quinceaneras01 quinceaneras02
#   ./optimize.sh force name quinceaneras01   # reprocesa con nombre arbitrario
#
# Requiere: ffmpeg + cwebp (brew install ffmpeg webp)

set -euo pipefail

# Homebrew en el PATH aunque se ejecute desde un entorno mínimo (osascript, cron…)
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

# Rutas: el script vive en /public
ROOT="$(cd "$(dirname "$0")" && pwd)"
SRC_DIR="$ROOT/images/hero"   # originales del hero
OUT_DIR="$ROOT/images/opt"    # optimizados (los referencia el sitio)

cd "$SRC_DIR"
mkdir -p "$OUT_DIR"

# Colores
G='\033[0;32m'; Y='\033[0;33m'; R='\033[0;31m'; B='\033[0;34m'; NC='\033[0m'

# Verifica deps
need() {
  if ! command -v "$1" &>/dev/null; then
    echo -e "${R}Falta '$1'. Instalalo con:${NC} brew install $2"
    exit 1
  fi
}
need ffmpeg ffmpeg
need cwebp  webp

# Formatea número con ceros (5 -> 05)
pad() { printf "%02d" "$1"; }

# Procesa una imagen por prefijo (image<n> o nombre arbitrario)
process_base() {
  local base=$1
  local force=${2:-0}
  local src=""

  for ext in jpeg jpg JPEG JPG png webp PNG WEBP; do
    if [[ -f "${base}.${ext}" ]]; then
      src="${base}.${ext}"
      break
    fi
  done

  if [[ -z "$src" ]]; then
    echo -e "${Y}[skip]${NC} ${base} — no encontré el original en images/hero/"
    return
  fi

  local out_jpg="$OUT_DIR/${base}-2560.jpg"
  local out_webp_2560="$OUT_DIR/${base}-2560.webp"
  local out_webp_1280="$OUT_DIR/${base}-1280.webp"

  if [[ $force -eq 0 && -f "$out_webp_2560" && -f "$out_webp_1280" && -f "$out_jpg" ]]; then
    echo -e "${B}[ya existe]${NC} ${base} — usá 'force' para reprocesar"
    return
  fi

  echo -e "${G}[procesando]${NC} $src"

  ffmpeg -y -loglevel error -i "$src" -vf "scale='min(2560,iw)':-2" -q:v 4 "$out_jpg"
  cwebp -quiet -q 78 -m 6 "$out_jpg" -o "$out_webp_2560"
  cwebp -quiet -q 72 -m 6 -resize 1280 0 "$out_jpg" -o "$out_webp_1280"

  local orig_kb jpg_kb webp_kb webp_m_kb
  orig_kb=$(du -k "$src" | cut -f1)
  jpg_kb=$(du -k "$out_jpg" | cut -f1)
  webp_kb=$(du -k "$out_webp_2560" | cut -f1)
  webp_m_kb=$(du -k "$out_webp_1280" | cut -f1)
  echo "           ${src}: ${orig_kb}KB → jpg ${jpg_kb}KB · webp2560 ${webp_kb}KB · webp1280 ${webp_m_kb}KB"
}

process_one() {
  local n=$1
  local force=${2:-0}
  process_base "image${n}" "$force"
}

# ---- Main ----
if [[ $# -eq 0 ]]; then
  echo "Uso: $0 <N> [N N ...] | all | force N [N ...] | name <basename> [basename ...]"
  exit 1
fi

FORCE=0
if [[ "$1" == "force" ]]; then
  FORCE=1
  shift
fi

if [[ "$1" == "name" ]]; then
  shift
  if [[ $# -eq 0 ]]; then
    echo -e "${R}Error:${NC} 'name' requiere al menos un basename"
    exit 1
  fi
  for base in "$@"; do
    process_base "$base" "$FORCE"
  done
elif [[ "$1" == "all" ]]; then
  shopt -s nullglob
  for f in image*.jpeg image*.jpg image*.JPEG image*.JPG image*.png; do
    [[ -f "$f" ]] || continue
    n=$(echo "$f" | sed -E 's/^image([0-9]+)\..+$/\1/')
    [[ -n "$n" ]] && process_one "$n" "$FORCE"
  done
  shopt -u nullglob
else
  for arg in "$@"; do
    n=$(pad "$arg")
    process_one "$n" "$FORCE"
  done
fi

echo -e "${G}Listo.${NC}"
echo "Originales:  $SRC_DIR"
echo "Optimizadas: $OUT_DIR ($(du -sh "$OUT_DIR" 2>/dev/null | cut -f1))"
