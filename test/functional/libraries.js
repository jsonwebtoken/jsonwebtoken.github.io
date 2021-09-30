const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiArrays = require('chai-arrays');

const request = require('request-promise-native');

const utils = require('./utils.js');

const isVisible = utils.isVisible;

chai.use(chaiAsPromised);
chai.use(chaiArrays);
const expect = chai.expect;

describe('Libraries', function() {
    before(utils.launchBrowser)
    before(async function() {
        await this.page.goto(`http://localhost:8000/libraries`);
    });

    after(utils.closeBrowser);

    it('Displays a sorted library filter', async function() {
        const libraries = await this.page.$eval('#libraries-select', select => {
            const result = [];

            Array.prototype.forEach.call(select.children, element => {
                result.push(element.value);
            });

            return result;
        });

        expect(libraries).to.be.sorted;
    });

    it('Should all have a valid logo', async function() {
        const imgs = await this.page.$$eval('.panel-heading img', imgs => {
            return Array.prototype.map.call(imgs, img => img.src);
        });

        const uniqueImgs = new Set(imgs);

        const promises = [];
        for (src of uniqueImgs) {
            promises.push(request(src));
        }

        return expect(Promise.all(promises)).to.be.fulfilled;
    });

    it('Hides and displays libraries using filters', async function() {
        await this.page.select('#libraries-select', '.php');
        // Wait for animation
        await this.page.waitFor(2000);

        expect(await this.page.$eval('.php', isVisible)).to.be.true;
        expect(await this.page.$eval('.net', isVisible)).to.be.false;
        expect(await this.page.$eval('.python', isVisible)).to.be.false;

        await this.page.waitForSelector('.net', {
            hidden: true
        });
        await this.page.waitForSelector('.python', {
            hidden: true
        });

        await this.page.select('#libraries-select', '*');
        // Wait for animation
        await this.page.waitFor(2000);

        await this.page.waitForSelector('.net', {
            visible: true
        });
        await this.page.waitForSelector('.php', {
            visible: true
        });
        await this.page.waitForSelector('.python', {
            visible: true
        });
    });

    it('Shows a repo link for each library', async function() {
        expect(await this.page.$$eval('.repository a', elements => {
            return Array.prototype.every.call(elements, e => {
                return !!e.href;
            });
        })).to.be.true;
    });

    // skipped since we're pulling these on the server now
    it.skip('Has a data-repo attribute for star counts if repo ' +
        'is in GitHub', async function() {
            const repos = await this.page.$$eval('.panel-wrap', bodies => {
                const result = [];
                for (let i = 0; i < bodies.length; ++i) {
                    const spanStars = bodies[i].querySelector('span.stars');
                    const repoUrl = bodies[i].querySelector('.repository a').href;

                    if (repoUrl.indexOf('github') !== -1) {
                        result.push({
                            url: repoUrl,
                            dataRepo: spanStars ? spanStars.getAttribute('data-repo') : null
                        });
                    }
                }

                return result;
            });

            for (const repo of repos) {
                expect(repo.dataRepo, repo.url).to.exist.and.not.be.empty;
            }
        });

    it('Displays libraries stacked on top of each other ' +
        'for small screens', async function() {
            try {
                await this.page.setViewport({
                    width: 375,
                    height: 1080
                });

                const libraries = await this.page.$$('article.accordion');

                let last = await libraries[0].boundingBox();
                const result = await Promise.all(libraries.slice(1).map(async element => {
                    const box = await element.boundingBox();
                    const result = box.x === last.x && box.y > last.y;
                    last = box;
                    return result;
                }));

                expect(result.every(value => value)).to.be.true;
            } finally {
                await this.page.setViewport({
                    width: 1920,
                    height: 1080
                });
            }
        });

    it('Sets the right classes when the vulnerability is and ' +
        'is not displayed ', async function() {
            expect(await this.page.$$eval('.panel-wrap', elements => {
                function getLibraryName(panelWrapElement) {
                    return panelWrapElement.parentNode
                        .querySelector('h3')
                        .firstChild
                        .textContent;
                }

                const result = [];

                Array.prototype.forEach.call(elements, el => {
                    const versionPresent = !!el.querySelector('.version');
                    const panelBodyElement = el.querySelector('.panel-body');
                    const mversionPresent = panelBodyElement.classList.contains('mversion');

                    if ((versionPresent && mversionPresent) ||
                        (!versionPresent && !mversionPresent)) {
                        // All good
                        return;
                    }

                    result.push(getLibraryName(el));
                });

                return result;
            })).to.be.empty;
        });

    it('Can pre-select a language with a name', async function () {
        await this.page.goto(`http://localhost:8000/libraries?language=Node.js`);
        expect(await this.page.$eval('.net', isVisible)).to.be.false;
        expect(await this.page.$eval('.php', isVisible)).to.be.false;
        expect(await this.page.$eval('.node', isVisible)).to.be.true;
    });

    it('Can pre-select a language with a class', async function () {
        await this.page.goto(`http://localhost:8000/libraries?language=node`);
        expect(await this.page.$eval('.net', isVisible)).to.be.false;
        expect(await this.page.$eval('.php', isVisible)).to.be.false;
        expect(await this.page.$eval('.node', isVisible)).to.be.true;
    });
});
