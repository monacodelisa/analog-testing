import { ɵ as __defineDirective, I as InjectionToken, i as inject, A as ActivatedRoute, a as __defineInjectable, b as __defineComponent, c as __HostDirectivesFeature, d as __StandaloneFeature, e as __element, f as __classMap, g as __property, h as __NgOnChangesFeature, j as __pipe, k as __pipeBind1, l as AsyncPipe, D as DOCUMENT, L as Location, R as Router, m as __listener, P as PLATFORM_ID, n as DomSanitizer, N as NgZone, o as isPlatformBrowser, p as assertInInjectionContext, q as DestroyRef, r as __sanitizeHtml } from './renderer.mjs';
import { of, Observable, from, isObservable, firstValueFrom } from 'rxjs';
import { map, switchMap, mergeMap, catchError, takeUntil } from 'rxjs/operators';
import fm from 'front-matter';
import { gfmHeadingId, getHeadingList } from 'marked-gfm-heading-id';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import 'zone.js/node';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../raw/index.mjs';

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
    assertInInjectionContext();
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
  _AnchorNavigationDirective.\u0275fac = function _AnchorNavigationDirective_Factory(t) {
    return new (t || _AnchorNavigationDirective)();
  };
  _AnchorNavigationDirective.\u0275dir = /* @__PURE__ */ __defineDirective({
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
  return (parts == null ? void 0 : parts.length) ? parts[4] : "";
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
  _ContentRenderer.\u0275fac = function _ContentRenderer_Factory(t) {
    return new (t || _ContentRenderer)();
  };
  _ContentRenderer.\u0275prov = /* @__PURE__ */ __defineInjectable({
    token: _ContentRenderer,
    factory: _ContentRenderer.\u0275fac
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
          let diff = lang == null ? void 0 : lang.startsWith("diff-");
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
  _MarkedSetupService.\u0275fac = function _MarkedSetupService_Factory(t) {
    return new (t || _MarkedSetupService)();
  };
  _MarkedSetupService.\u0275prov = /* @__PURE__ */ __defineInjectable({
    token: _MarkedSetupService,
    factory: _MarkedSetupService.\u0275fac
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
  _MarkdownContentRendererService.\u0275fac = function _MarkdownContentRendererService_Factory(t) {
    return new (t || _MarkdownContentRendererService)();
  };
  _MarkdownContentRendererService.\u0275prov = /* @__PURE__ */ __defineInjectable({
    token: _MarkdownContentRendererService,
    factory: _MarkdownContentRendererService.\u0275fac
  });
  return MarkdownContentRendererService2;
})();
function withMarkdownRenderer(options) {
  return [{
    provide: ContentRenderer,
    useFactory: () => new MarkdownContentRendererService(),
    deps: [MarkedSetupService]
  }, (options == null ? void 0 : options.loadMermaid) ? [{
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
  _AnalogMarkdownRouteComponent.\u0275fac = function _AnalogMarkdownRouteComponent_Factory(t) {
    return new (t || _AnalogMarkdownRouteComponent)();
  };
  _AnalogMarkdownRouteComponent.\u0275cmp = /* @__PURE__ */ __defineComponent({
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
      this.content$ = this.route.data.pipe(map((data) => {
        var _a;
        return (_a = this.content) != null ? _a : data["_analogContent"];
      }), mergeMap((contentString) => this.renderContent(contentString)), map((content) => this.sanitizer.bypassSecurityTrustHtml(content)), catchError((e) => of(`There was an error ${e}`)));
    }
    renderContent(content) {
      return __async(this, null, function* () {
        return this.contentRenderer.render(content);
      });
    }
    ngAfterViewChecked() {
      this.contentRenderer.enhance();
      this.zone.runOutsideAngular(() => {
        var _a;
        return (_a = this.mermaid) == null ? void 0 : _a.default.run();
      });
    }
    loadMermaid(mermaidImport) {
      this.zone.runOutsideAngular(() => (
        // Wrap into an observable to avoid redundant initialization once
        // the markdown component is destroyed before the promise is resolved.
        from(mermaidImport).pipe(takeUntilDestroyed()).subscribe((mermaid) => {
          var _a;
          this.mermaid = mermaid;
          this.mermaid.default.initialize({
            startOnLoad: false
          });
          (_a = this.mermaid) == null ? void 0 : _a.default.run();
        })
      ));
    }
  }
  _AnalogMarkdownComponent = AnalogMarkdownComponent2;
  _AnalogMarkdownComponent.\u0275fac = function _AnalogMarkdownComponent_Factory(t) {
    return new (t || _AnalogMarkdownComponent)();
  };
  _AnalogMarkdownComponent.\u0275cmp = /* @__PURE__ */ __defineComponent({
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

export { AnchorNavigationDirective, ContentRenderer, AnalogMarkdownComponent as MarkdownComponent, MarkdownContentRendererService, AnalogMarkdownRouteComponent as MarkdownRouteComponent, MarkedSetupService, injectContent, injectContentFiles, parseRawContentFile, provideContent, withMarkdownRenderer };
//# sourceMappingURL=analogjs-content-Bd5qOT4v.mjs.map
