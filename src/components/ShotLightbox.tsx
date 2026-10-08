import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import { shots } from '@/data'

const slides = shots.map((s) => ({
  src: s.src,
  width: s.w,
  height: s.h,
  alt: s.alt,
  description: `${s.title} — ${s.caption}`,
}))

/** Loaded on demand the first time a screenshot is opened. */
export default function ShotLightbox({ index, onClose }: { index: number; onClose: () => void }) {
  return (
    <Lightbox
      open={index >= 0}
      index={index}
      close={onClose}
      slides={slides}
      plugins={[Zoom, Captions, Counter]}
      zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
      captions={{ descriptionTextAlign: 'center' }}
      controller={{ closeOnBackdropClick: true }}
    />
  )
}
