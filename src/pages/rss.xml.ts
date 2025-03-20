import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import config from "@config";

type Context = {
  site: string;
};

export async function GET(context: Context) {
  const projects = (await getCollection("projects")).filter(
    (project) => !project.data.draft,
  );

  const items = projects.sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );

  return rss({
    title: config.meta.home.title,
    description: config.meta.home.description,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.slug}/`,
    })),
  });
}
