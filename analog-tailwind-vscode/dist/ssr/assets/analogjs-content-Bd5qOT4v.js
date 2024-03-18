var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { a as assertInInjectionContext, i as inject, D as DestroyRef, ɵ as __defineDirective, I as InjectionToken, A as ActivatedRoute, b as __defineInjectable, c as __defineComponent, d as __HostDirectivesFeature, e as __StandaloneFeature, f as __element, g as __classMap, h as __property, j as __NgOnChangesFeature, k as __pipe, l as __pipeBind1, m as AsyncPipe, n as DOCUMENT, L as Location, R as Router, o as __listener, P as PLATFORM_ID, p as DomSanitizer, N as NgZone, q as isPlatformBrowser, r as __sanitizeHtml } from "../main.server.js";
import { Observable, of, from, isObservable, firstValueFrom } from "rxjs";
import { takeUntil, map, switchMap, mergeMap, catchError } from "rxjs/operators";
import fm from "front-matter";
import { gfmHeadingId, getHeadingList } from "marked-gfm-heading-id";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import "prismjs";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-css.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-markup.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js";
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "zone.js/node";
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function _assertClassBrand(e, t, n) {
  if ("function" == typeof e ? e === t : e.has(t))
    return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function _classPrivateFieldGet2(s, a) {
  return s.get(_assertClassBrand(s, a));
}
function _classPrivateFieldSet2(s, a, r) {
  return s.set(_assertClassBrand(s, a), r), r;
}
function takeUntilDestroyed(destroyRef) {
  if (!destroyRef) {
    assertInInjectionContext(takeUntilDestroyed);
    destroyRef = inject(DestroyRef);
  }
  const destroyed$ = new Observable((observer) => {
    const unregisterFn = destroyRef.onDestroy(observer.next.bind(observer));
    return unregisterFn;
  });
  return (source) => {
    return source.pipe(takeUntil(destroyed$));
  };
}
let AnchorNavigationDirective = /* @__PURE__ */ (() => {
  var _AnchorNavigationDirective;
  class AnchorNavigationDirective2 {
    constructor() {
      this.document = inject(DOCUMENT);
      this.location = inject(Location);
      this.router = inject(Router);
    }
    handleNavigation(element) {
      if (element instanceof HTMLAnchorElement && isInternalUrl(element, this.document) && hasTargetSelf(element) && !hasDownloadAttribute(element)) {
        const {
          pathname,
          search,
          hash
        } = element;
        const url = this.location.normalize(`${pathname}${search}${hash}`);
        this.router.navigateByUrl(url);
        return false;
      }
      return true;
    }
  }
  _AnchorNavigationDirective = AnchorNavigationDirective2;
  _AnchorNavigationDirective.ɵfac = function _AnchorNavigationDirective_Factory(t) {
    return new (t || _AnchorNavigationDirective)();
  };
  _AnchorNavigationDirective.ɵdir = /* @__PURE__ */ __defineDirective({
    type: _AnchorNavigationDirective,
    selectors: [["", "analogAnchorNavigation", ""]],
    hostBindings: function _AnchorNavigationDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        __listener("click", function _AnchorNavigationDirective_click_HostBindingHandler($event) {
          return ctx.handleNavigation($event.target);
        });
      }
    },
    standalone: true
  });
  return AnchorNavigationDirective2;
})();
function hasDownloadAttribute(anchorElement) {
  return anchorElement.getAttribute("download") !== null;
}
function hasTargetSelf(anchorElement) {
  return !anchorElement.target || anchorElement.target === "_self";
}
function isInternalUrl(anchorElement, document) {
  return anchorElement.host === document.location.host && anchorElement.protocol === document.location.protocol;
}
const getContentFilesList = () => /* @__PURE__ */ Object.assign({});
const getContentFiles = () => /* @__PURE__ */ Object.assign({});
function getSlug(filename) {
  const parts = filename.match(/^(\\|\/)(.+(\\|\/))*(.+)\.(.+)$/);
  return parts?.length ? parts[4] : "";
}
const CONTENT_FILES_LIST_TOKEN = new InjectionToken("@analogjs/content Content Files List", {
  providedIn: "root",
  factory() {
    const contentFiles = getContentFilesList();
    return Object.keys(contentFiles).map((filename) => {
      const attributes = contentFiles[filename];
      const slug = attributes["slug"];
      return {
        filename,
        attributes,
        slug: slug ? encodeURI(slug) : encodeURI(getSlug(filename))
      };
    });
  }
});
const CONTENT_FILES_TOKEN = new InjectionToken("@analogjs/content Content Files", {
  providedIn: "root",
  factory() {
    const contentFiles = getContentFiles();
    const contentFilesList = inject(CONTENT_FILES_LIST_TOKEN);
    const lookup = {};
    contentFilesList.forEach((item) => {
      const fileParts = item.filename.split("/");
      const filePath = fileParts.slice(0, fileParts.length - 1).join("/");
      lookup[item.filename] = `${filePath}/${item.slug}.md`;
    });
    const objectUsingSlugAttribute = {};
    Object.entries(contentFiles).forEach((entry) => {
      const filename = entry[0];
      const value = entry[1];
      const newFilename = lookup[filename];
      if (newFilename !== void 0) {
        objectUsingSlugAttribute[newFilename] = value;
      }
    });
    return objectUsingSlugAttribute;
  }
});
function parseRawContentFile(rawContentFile) {
  const {
    body,
    attributes
  } = fm(rawContentFile);
  return {
    content: body,
    attributes
  };
}
function waitFor(prom) {
  return __async(this, null, function* () {
    if (isObservable(prom)) {
      prom = firstValueFrom(prom);
    }
    const macroTask = Zone.current.scheduleMacroTask(`AnalogContentResolve-${Math.random()}`, () => {
    }, {}, () => {
    });
    return prom.then((p) => {
      macroTask.invoke();
      return p;
    });
  });
}
function getContentFile(contentFiles, prefix, slug, fallback) {
  const filePath = `/src/content/${prefix}${slug}.md`;
  const contentFile = contentFiles[filePath];
  if (!contentFile) {
    return of({
      filename: filePath,
      attributes: {},
      slug: "",
      content: fallback
    });
  }
  return new Observable((observer) => {
    const contentResolver = contentFile();
    {
      waitFor(contentResolver).then((content) => {
        observer.next(content);
      });
    }
  }).pipe(map((rawContentFile) => {
    const {
      content,
      attributes
    } = parseRawContentFile(rawContentFile);
    return {
      filename: filePath,
      slug,
      attributes,
      content
    };
  }));
}
function injectContent(param = "slug", fallback = "No Content Found") {
  const contentFiles = inject(CONTENT_FILES_TOKEN);
  if (typeof param === "string" || "param" in param) {
    const prefix = typeof param === "string" ? "" : `${param.subdirectory}/`;
    const route = inject(ActivatedRoute);
    const paramKey = typeof param === "string" ? param : param.param;
    return route.paramMap.pipe(map((params) => params.get(paramKey)), switchMap((slug) => {
      if (slug) {
        return getContentFile(contentFiles, prefix, slug, fallback);
      } else {
        return of({
          filename: "",
          slug: "",
          attributes: {},
          content: fallback
        });
      }
    }));
  } else {
    return getContentFile(contentFiles, "", param.customFilename, fallback);
  }
}
let ContentRenderer = /* @__PURE__ */ (() => {
  var _ContentRenderer;
  class ContentRenderer2 {
    render(content) {
      return __async(this, null, function* () {
        return content;
      });
    }
    getContentHeadings() {
      return [];
    }
    // eslint-disable-next-line
    enhance() {
    }
  }
  _ContentRenderer = ContentRenderer2;
  _ContentRenderer.ɵfac = function _ContentRenderer_Factory(t) {
    return new (t || _ContentRenderer)();
  };
  _ContentRenderer.ɵprov = /* @__PURE__ */ __defineInjectable({
    token: _ContentRenderer,
    factory: _ContentRenderer.ɵfac
  });
  return ContentRenderer2;
})();
function injectContentFiles(filterFn) {
  const allContentFiles = inject(CONTENT_FILES_LIST_TOKEN);
  if (filterFn) {
    const filteredContentFiles = allContentFiles.filter(filterFn);
    return filteredContentFiles;
  }
  return allContentFiles;
}
(function() {
  if (typeof Prism === "undefined") {
    return;
  }
  Prism.languages.angular = Prism.languages.extend("markup", {
    keyword: /(?:@if|@for|@switch|@defer|@loading|@error|@placeholder|prefetch)\b/,
    operator: /\b(?:on|when)\b/,
    number: {
      pattern: /\b(minimum|after)\s+\d+(?:s|ms|)/gi,
      lookbehind: true
    },
    builtin: {
      pattern: /\b(?:viewport|timer|minimum|after|hover|idle|immediate|interaction)/
    },
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/
  });
  Prism.languages.ng = Prism.languages.angular;
})();
let MarkedSetupService = /* @__PURE__ */ (() => {
  var _MarkedSetupService;
  class MarkedSetupService2 {
    constructor() {
      const renderer = new marked.Renderer();
      renderer.code = (code, lang) => {
        if (lang === "mermaid") {
          return '<pre class="mermaid">' + code + "</pre>";
        }
        if (!lang) {
          return "<pre><code>" + code + "</code></pre>";
        }
        const classes = lang.startsWith("diff") && Prism.languages["diff"] ? `language-${lang} diff-highlight` : `language-${lang.replace("diff-", "")}`;
        return `<pre class="${classes}"><code class="${classes}">${code}</code></pre>`;
      };
      marked.use(gfmHeadingId(), markedHighlight({
        async: true,
        highlight: (code, lang) => {
          let diff = lang?.startsWith("diff-");
          lang = diff ? lang.replace("diff-", "") : lang || "typescript";
          if (diff && !Prism.languages["diff"]) {
            diff = false;
            console.warn(`Notice:
    ---------------------------------------------------------------------------------------
    The \`diff\` language and plugin are not available in the provided setup.
    To enable it, add the following imports your \`main.ts\`:
      import 'prismjs/components/prism-diff';
      import 'prismjs/plugins/diff-highlight/prism-diff-highlight';
    ---------------------------------------------------------------------------------------
            `);
          }
          if (!Prism.languages[lang]) {
            if (lang !== "mermaid") {
              console.warn(`Notice:
    ---------------------------------------------------------------------------------------
    The requested language '${lang}' is not available in the provided setup.
    To enable it, add the following import your \`main.ts\`:
      import 'prismjs/components/prism-${lang}';
    ---------------------------------------------------------------------------------------
              `);
            }
            return code;
          }
          return Prism.highlight(code, diff ? Prism.languages["diff"] : Prism.languages[lang], lang);
        }
      }), {
        renderer,
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartypants: false,
        xhtml: false,
        mangle: false
      });
      this.marked = marked;
    }
    getMarkedInstance() {
      return this.marked;
    }
  }
  _MarkedSetupService = MarkedSetupService2;
  _MarkedSetupService.ɵfac = function _MarkedSetupService_Factory(t) {
    return new (t || _MarkedSetupService)();
  };
  _MarkedSetupService.ɵprov = /* @__PURE__ */ __defineInjectable({
    token: _MarkedSetupService,
    factory: _MarkedSetupService.ɵfac
  });
  return MarkedSetupService2;
})();
let MarkdownContentRendererService = /* @__PURE__ */ (() => {
  var _MarkdownContentRendererService;
  var _marked = /* @__PURE__ */ new WeakMap();
  class MarkdownContentRendererService2 {
    constructor() {
      _classPrivateFieldInitSpec(this, _marked, void 0);
      this.platformId = inject(PLATFORM_ID);
      _classPrivateFieldSet2(_marked, this, inject(MarkedSetupService, {
        self: true
      }));
    }
    render(content) {
      return __async(this, null, function* () {
        return _classPrivateFieldGet2(_marked, this).getMarkedInstance().parse(content);
      });
    }
    /**
     * The method is meant to be called after `render()`
     */
    getContentHeadings() {
      return getHeadingList();
    }
    // eslint-disable-next-line
    enhance() {
    }
  }
  _MarkdownContentRendererService = MarkdownContentRendererService2;
  _MarkdownContentRendererService.ɵfac = function _MarkdownContentRendererService_Factory(t) {
    return new (t || _MarkdownContentRendererService)();
  };
  _MarkdownContentRendererService.ɵprov = /* @__PURE__ */ __defineInjectable({
    token: _MarkdownContentRendererService,
    factory: _MarkdownContentRendererService.ɵfac
  });
  return MarkdownContentRendererService2;
})();
function withMarkdownRenderer(options) {
  return [{
    provide: ContentRenderer,
    useFactory: () => new MarkdownContentRendererService(),
    deps: [MarkedSetupService]
  }, options?.loadMermaid ? [{
    provide: MERMAID_IMPORT_TOKEN,
    useFactory: options.loadMermaid
  }] : []];
}
function provideContent(...features) {
  return [...features, MarkedSetupService];
}
const MERMAID_IMPORT_TOKEN = new InjectionToken("mermaid_import");
let AnalogMarkdownRouteComponent = /* @__PURE__ */ (() => {
  var _AnalogMarkdownRouteComponent;
  class AnalogMarkdownRouteComponent2 {
    constructor() {
      this.sanitizer = inject(DomSanitizer);
      this.route = inject(ActivatedRoute);
      this.contentRenderer = inject(ContentRenderer);
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.route.snapshot.data["renderedAnalogContent"]);
      this.classes = "analog-markdown-route";
    }
    ngAfterViewChecked() {
      this.contentRenderer.enhance();
    }
  }
  _AnalogMarkdownRouteComponent = AnalogMarkdownRouteComponent2;
  _AnalogMarkdownRouteComponent.ɵfac = function _AnalogMarkdownRouteComponent_Factory(t) {
    return new (t || _AnalogMarkdownRouteComponent)();
  };
  _AnalogMarkdownRouteComponent.ɵcmp = /* @__PURE__ */ __defineComponent({
    type: _AnalogMarkdownRouteComponent,
    selectors: [["analog-markdown-route"]],
    inputs: {
      classes: "classes"
    },
    standalone: true,
    features: [__HostDirectivesFeature([AnchorNavigationDirective]), __StandaloneFeature],
    decls: 1,
    vars: 3,
    consts: [[3, "innerHTML"]],
    template: function _AnalogMarkdownRouteComponent_Template(rf, ctx) {
      if (rf & 1) {
        __element(0, "div", 0);
      }
      if (rf & 2) {
        __classMap(ctx.classes);
        __property("innerHTML", ctx.content, __sanitizeHtml);
      }
    },
    encapsulation: 2
  });
  return AnalogMarkdownRouteComponent2;
})();
let AnalogMarkdownComponent = /* @__PURE__ */ (() => {
  var _AnalogMarkdownComponent;
  class AnalogMarkdownComponent2 {
    constructor() {
      this.sanitizer = inject(DomSanitizer);
      this.route = inject(ActivatedRoute);
      this.zone = inject(NgZone);
      this.platformId = inject(PLATFORM_ID);
      this.mermaidImport = inject(MERMAID_IMPORT_TOKEN, {
        optional: true
      });
      this.content$ = of("");
      this.classes = "analog-markdown";
      this.contentRenderer = inject(ContentRenderer);
      if (isPlatformBrowser(this.platformId) && this.mermaidImport) {
        this.loadMermaid(this.mermaidImport);
      }
    }
    ngOnInit() {
      this.updateContent();
    }
    ngOnChanges() {
      this.updateContent();
    }
    updateContent() {
      this.content$ = this.route.data.pipe(map((data) => this.content ?? data["_analogContent"]), mergeMap((contentString) => this.renderContent(contentString)), map((content) => this.sanitizer.bypassSecurityTrustHtml(content)), catchError((e) => of(`There was an error ${e}`)));
    }
    renderContent(content) {
      return __async(this, null, function* () {
        return this.contentRenderer.render(content);
      });
    }
    ngAfterViewChecked() {
      this.contentRenderer.enhance();
      this.zone.runOutsideAngular(() => this.mermaid?.default.run());
    }
    loadMermaid(mermaidImport) {
      this.zone.runOutsideAngular(() => (
        // Wrap into an observable to avoid redundant initialization once
        // the markdown component is destroyed before the promise is resolved.
        from(mermaidImport).pipe(takeUntilDestroyed()).subscribe((mermaid) => {
          this.mermaid = mermaid;
          this.mermaid.default.initialize({
            startOnLoad: false
          });
          this.mermaid?.default.run();
        })
      ));
    }
  }
  _AnalogMarkdownComponent = AnalogMarkdownComponent2;
  _AnalogMarkdownComponent.ɵfac = function _AnalogMarkdownComponent_Factory(t) {
    return new (t || _AnalogMarkdownComponent)();
  };
  _AnalogMarkdownComponent.ɵcmp = /* @__PURE__ */ __defineComponent({
    type: _AnalogMarkdownComponent,
    selectors: [["analog-markdown"]],
    inputs: {
      content: "content",
      classes: "classes"
    },
    standalone: true,
    features: [__HostDirectivesFeature([AnchorNavigationDirective]), __NgOnChangesFeature, __StandaloneFeature],
    decls: 2,
    vars: 5,
    consts: [[3, "innerHTML"]],
    template: function _AnalogMarkdownComponent_Template(rf, ctx) {
      if (rf & 1) {
        __element(0, "div", 0);
        __pipe(1, "async");
      }
      if (rf & 2) {
        __classMap(ctx.classes);
        __property("innerHTML", __pipeBind1(1, 3, ctx.content$), __sanitizeHtml);
      }
    },
    dependencies: [AsyncPipe],
    encapsulation: 2
  });
  return AnalogMarkdownComponent2;
})();
export {
  AnchorNavigationDirective,
  ContentRenderer,
  AnalogMarkdownComponent as MarkdownComponent,
  MarkdownContentRendererService,
  AnalogMarkdownRouteComponent as MarkdownRouteComponent,
  MarkedSetupService,
  injectContent,
  injectContentFiles,
  parseRawContentFile,
  provideContent,
  withMarkdownRenderer
};
