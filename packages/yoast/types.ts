import { Package } from "frontity/types";
import Router from "@frontity/router/types";
import Html2React from "@frontity/html2react/types";
import { Entity } from "@frontity/source/types";
import WpSource from "@frontity/wp-source/types";

/**
 * Type for objects that contain the `yoast_head` field.
 */
export interface WithYoastHead extends Entity {
  /**
   * All meta tags in string format.
   */
  yoast_head?: string;
}

/**
 * Integrate your Frontity site with Yoast SEO plugin.
 */
interface YoastPackage extends Package {
  /**
   * Root components exported by this package.
   */
  roots: {
    /**
     * Yoast namespace.
     */
    yoast: React.FC;
  };

  /**
   * State exposed by this package.
   */
  state: {
    /**
     * Yoast namespace.
     */
    yoast: {
      /**
       * Define when to render the Yoast meta tags.
       *
       * By default, this setting is set to `"both"` which means all the Yoast
       * meta tags will be render both in the server and the client.
       *
       * When this setting is set to `"server"`, the tags are only included in
       * the HTML generated by the Frontity server and disappear once Frontity
       * has loaded in the client. The title tag is still shown while navigating
       * but not the rest of them. This option is useful to improve the
       * perfomance a bit saving some CPU cycles, as the `<Html2React>`
       * component -- which is used to render the meta tags -- is not needed to
       * render only the title tag.
       *
       * @remarks
       * The `"server"` option shouldn’t affect the SEO as Google and other
       * search engines does not do client-side navigation.
       *
       * @defaultValue `"both"`
       */
      renderTags?: "both" | "server";

      /**
       * Define a set of properties to transform links present in the
       * `yoast_head` field in case you are
       * using Frontity in decoupled mode.
       *
       * If you are using Frontity in embedded mode, this property must be set
       * to `false`.
       *
       * @example
       * ```
       * {
       *   ignore: "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc",
       *   base: "https://wp.mysite.com"
       * }
       * ```
       * @example false
       *
       * @defaultValue
       * `{ ignore: "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc" }`
       */
      transformLinks:
        | {
            /**
             * RegExp in string format that defines a set of links that must
             * not be transformed.
             *
             * @defaultValue
             * "^(wp-(json|admin|content|includes))|feed|comments|xmlrpc"
             */
            ignore: string;

            /**
             * WordPress URL base that must be replaced by the Frontity URL
             * base (specified in `state.frontity.url`). If this value is not
             * set, it is computed from `state.source.api`.
             */
            base?: string;
          }
        | false;
    };
  };
}

export default YoastPackage;

/**
 * Yoast package and its dependencies.
 */
// TODO - Use `MergePackages` here.
export type Packages = YoastPackage &
  Router &
  Omit<WpSource, "name"> &
  Omit<Html2React, "name">;