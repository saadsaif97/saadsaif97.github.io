import satori from "satori";
import loadGoogleFonts from "../loadGoogleFont";

export default async () => {
  return satori(
    {
      type: "div",
      props: {
        style: {
          background: "#006cac",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "3rem",
                height: "100%",
                width: "100%",
                gap: "1.5rem",
              },
              children: [
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 36,
                      fontWeight: 600,
                      color: "#ffffff",
                      opacity: 0.9,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    },
                    children: "The Most Comprehensive Shopify Development Training",
                  },
                },
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 72,
                      fontWeight: "bold",
                      color: "#ffffff",
                      lineHeight: 1.1,
                      maxWidth: "90%",
                    },
                    children: "Learn Shopify Development with AI",
                  },
                },
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 32,
                      color: "#ffffff",
                      opacity: 0.95,
                      maxWidth: "90%",
                    },
                    children:
                      "Themes, Figma to Shopify, Plus apps, Functions, Flow & debugging",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      marginTop: "1rem",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#ffffff",
                            borderRadius: "0.5rem",
                            padding: "1rem 2rem",
                          },
                          children: {
                            type: "p",
                            props: {
                              style: {
                                fontSize: 44,
                                fontWeight: "bold",
                                color: "#006cac",
                              },
                              children: "Launch Price $47",
                            },
                          },
                        },
                      },
                      {
                        type: "p",
                        props: {
                          style: {
                            fontSize: 28,
                            color: "#ffffff",
                            opacity: 0.9,
                          },
                          children: "Reserve your seat now",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        "The Most Comprehensive Shopify Development Training Learn with AI Themes, Figma to Shopify Plus apps, Functions, Flow & debugging Launch Price $47 Reserve your seat now ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 .,&$'-"
      ),
    }
  );
};