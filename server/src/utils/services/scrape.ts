import { PlaywrightCrawler, Request, Dataset } from 'crawlee';;

export const crates_rpm = async (package_name: string) => {
try {
    const crate_url = `https://crates.io/crates/${package_name}`;
    const crawler = new PlaywrightCrawler({
      requestHandler: async ({ request, page }) => {
        const title = await page.title();
        console.log(title);
        // if (request.label === 'repository') {
        //   const commitText = await page.getByRole('listitem').filter({ hasText: 'commits' }).textContent();
        //   const stars = await page.$$eval('main', (github) => github.map((star) => star?.querySelector('div.Layout-sidebar > div.BorderGrid--spacious > div.hide-sm > div.BorderGrid-cell')?.querySelector('div > a > strong')?.textContent));
        //   const numberStrings = commitText?.match(/\d+/g);
        //   const commitCount = Number(numberStrings?.join(''));
        //   console.log(commitCount);
        //   await Dataset.pushData({
        //     ...request.userData,
        //     commitCount,
        //     stars: stars[0],
        //   });
        // } else {
          await page.waitForFunction(() => document.querySelector('ul._list_181lzn > li'));
          const main_package = await page.$$eval('main', (package_lib) => {
            return package_lib.map((package_el) => {
              const package_name = package_el.querySelector('h1._heading_8qtlic > span')?.textContent;
              const keywords = Array.from(package_el.querySelectorAll('ul._keywords_8qtlic > li')).map((keyList) => keyList?.textContent?.trim());
              const toText = (element:HTMLElement) => element && element.textContent?.trim();
              const toLink = (element:HTMLElement) => element && element.getAttribute('src');
              const time_uploaded = package_el?.querySelector('time._date_rj9k29')?.getAttribute('datetime');
              const license_name = package_el?.querySelector('div._license_rj9k29 > span > a')?.textContent;
              const license_url = package_el?.querySelector('div._license_rj9k29 > span > a')?.getAttribute('href');
              const version = package_el?.querySelector('small')?.innerText;
              const description = package_el?.querySelector('div._description_8qtlic')?.textContent?.trim();
              const total_downloads = package_el.querySelector('span._num__align_87huyj')?.textContent?.trim();
              const license = { type: license_name?.trim(), url: license_url };
              const links = Array.from(package_el.querySelectorAll('div._links_rj9k29 > div')).map((link) => {
                return {
                  name: link.querySelector('div > h2._heading_rj9k29')?.innerHTML,
                  URL: link.querySelector('div._content_t2rnmm > a._link_t2rnmm')?.getAttribute('href'),
                };
              });
              const owners = Array.from(package_el?.querySelectorAll('ul._list_181lzn > li')).map((owners) => {
                const name = owners?.querySelector('a > span')?.textContent?.trim();
                const profile = owners?.querySelector('img')?.getAttribute('src');
                const user_url = owners?.querySelector('a')?.getAttribute('href');
                return { name, profile, user_url };
              });
              const package_obj = { keywords, package_name, time_uploaded, license, version, description, links, total_downloads, owners}
              return package_obj
            });
          });
          // const requests = main_package.map(($package) =>
          //     new Request({
          //       url:  `'${$package.links?.find((github) => github?.name === "Repository")?.URL}'`,
          //       label: 'repository',
          //       userData: $package,
          //     })
          // );
          // await crawler.addRequests(requests);
          await Dataset.pushData(main_package[0]);
        // }
      },
    });
    await crawler.run([crate_url]);
    const raw_dataset = await Dataset.getData();
    const dataset = raw_dataset.items.pop();
    return dataset;
} catch (error) {
  console.log(error)
}
};



export const scrape_art = async (url: string) => {
  const extract_url = new URL(url)
  const main_url = `${extract_url.protocol}//${extract_url.hostname}`;
  console.log('main_url', main_url);
  
  const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page }) => {
      const title = await page.title();
      

      await page.waitForFunction(() => document.querySelector('head meta[name="description"]'));

      const main_article = await page.$$eval('html', (article) => {
        return article.map((art) => {
          const default_description = art.querySelector('meta[name="description"]')?.getAttribute('content');
          const og_description = art.querySelector('meta[property="og:description"]')?.getAttribute('content');
          const favicon = art.querySelector('link[rel="icon"]')?.getAttribute('href')
          const article_link = art.querySelector('meta[property="og:url"]')?.getAttribute('content')
          const site_name = art.querySelector('meta[property="og:site_name"]')?.getAttribute('content')
          const art_img = art.querySelector('meta[property="og:image"]')?.getAttribute('content')
          
          return {
            og_description,
            favicon,
            article_link,
            site_name,
            art_img,
            
          };
        });
      });

      console.log('main_article', { main_url, title, ...main_article[0] });
      const article_obj = { main_url, title, ...main_article[0] };
      await Dataset.pushData(article_obj);
    },
  });

  await crawler.run([url]);
  const data = await Dataset.getData();
  const dataset = data.items.pop()
  return dataset
}


// scrape_art('https://marketsplash.com/tutorials/rust/rust-web-development/',).then((data) => console.log(data));