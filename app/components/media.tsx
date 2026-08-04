import Image from "next/image";
import type { ResolvedSlot } from "@/lib/media";

type Fit = "cover" | "contain";

/**
 * An image slot. When the file exists it renders; when it does not, it renders
 * a plate naming the path to drop the file at, so the layout is right either
 * way and nobody has to guess where the media goes.
 */
export function Media({
  slot,
  className = "",
  ratio,
  fit = "cover",
  sizes = "100vw",
  priority = false,
}: {
  slot: ResolvedSlot;
  className?: string;
  /** CSS aspect-ratio, e.g. "16 / 9". Omit to fill the parent. */
  ratio?: string;
  fit?: Fit;
  sizes?: string;
  priority?: boolean;
}) {
  const style = ratio ? { aspectRatio: ratio } : undefined;

  if (!slot.ready) {
    return (
      <div
        className={`slot ${className}`}
        style={style}
        role="img"
        aria-label={`Placeholder for ${slot.alt || slot.src}`}
      >
        <span className="slot-path">{slot.src}</span>
        <span className="slot-size">{slot.size}</span>
      </div>
    );
  }

  return (
    <div className={`media ${className}`} style={style}>
      <Image
        src={`/${slot.src}`}
        alt={slot.alt}
        width={slot.width}
        height={slot.height}
        sizes={sizes}
        priority={priority}
        style={{ objectFit: fit }}
      />
    </div>
  );
}

/**
 * The hero backdrop. Plays the loop if it is there, falls back to the poster
 * still, and falls back again to a plate. Muted, inline and loop only — it is
 * a backdrop, so it carries no sound and no controls.
 */
export function HeroBackdrop({
  video,
  webm,
  poster,
}: {
  video: ResolvedSlot;
  webm: ResolvedSlot;
  poster: ResolvedSlot;
}) {
  if (video.ready || webm.ready) {
    return (
      <div className="backdrop">
        <video
          className="backdrop-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster.ready ? `/${poster.src}` : undefined}
          aria-hidden="true"
        >
          {webm.ready && <source src={`/${webm.src}`} type="video/webm" />}
          {video.ready && <source src={`/${video.src}`} type="video/mp4" />}
        </video>
        <div className="backdrop-scrim" />
      </div>
    );
  }

  if (poster.ready) {
    return (
      <div className="backdrop">
        <Image
          src={`/${poster.src}`}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="backdrop-scrim" />
      </div>
    );
  }

  return (
    <div className="backdrop backdrop-empty" aria-hidden="true">
      <span className="slot-path">{video.src}</span>
      <span className="slot-size">
        {video.size} · or {poster.src}
      </span>
      <div className="backdrop-scrim" />
    </div>
  );
}
