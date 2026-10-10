const LOADER_SRC = "/assets/loader.png";

/**
 * Server-rendered so it paints with the first HTML (during load).
 * An inline script dismisses it on window `load` — not after hydration.
 */
export function PageLoader() {
  return (
    <>
      <div
        id="eef-page-loader"
        className="eef-page-loader"
        role="status"
        aria-live="polite"
        aria-busy="true"
        suppressHydrationWarning
      >
        <span className="sr-only">Chargement…</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOADER_SRC}
          alt=""
          width={96}
          height={96}
          className="eef-loader-zoom"
          draggable={false}
        />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var el=document.getElementById("eef-page-loader");if(!el)return;function hide(){if(!el||el.classList.contains("eef-page-loader--out"))return;el.classList.add("eef-page-loader--out");el.setAttribute("aria-busy","false");setTimeout(function(){el&&el.remove();},480);}if(document.readyState==="complete"){hide();}else{window.addEventListener("load",hide,{once:true});}})();`,
        }}
      />
    </>
  );
}
