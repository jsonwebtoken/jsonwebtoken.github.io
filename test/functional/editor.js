const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiArrays = require('chai-arrays');

const express = require('express');
const jose = require('jose');

const _ = require('lodash');

const utils = require('./utils.js');
const defaultTokens =
    require('esm')(module)('../../src/editor/default-tokens.js').default;
const jwks = require('./jwks.json');

const { isVisible, selectAll } = utils;

chai.use(chaiAsPromised);
chai.use(chaiArrays);
const expect = chai.expect;

const typingDelay = 0;
const tokenProcessingWait = 300;
const tokenEditorThrottleWait = 1200;

describe('Editor', function() {
    this.timeout(75000);

    before(utils.launchBrowser);

    after(utils.closeBrowser);

    it('Displays editor when clicking on navbar', async function() {
        await this.page.click('a[href="/#debugger-io"]');
        // Wait for scroll
        await this.page.waitFor(3000);
        expect(await this.page.$eval('#debugger-io', isVisible)).to.be.true;
    });

    it('HS256 should be selected by default', async function() {
        const selected = await this.page.$eval('#algorithm-select', select => {
            return select.options[select.selectedIndex].value;
        });

        expect(selected).to.equal('HS256');
    });

    it('Default selected token should say something ' +
        'about secret length', async function() {
            const secret = this.page.$eval('input[name="secret"]',
                secretInput => secretInput.value);
            return expect(secret).to.eventually.include('256');
        });

    it('Should select default tokens when no changes have ' +
        'been made', async function() {
            try {
                await this.page.select('#algorithm-select', 'HS256');

                const algs = await this.page.$eval('#algorithm-select', select => {
                    return Array.prototype.map.call(select.options, opt => opt.value);
                });

                for (const alg of algs) {
                    await this.page.select('#algorithm-select', alg);
                    const token = await this.page.evaluate(() => {
                        return window.test.tokenEditor.getValue();
                    });

                    expect(defaultTokens[alg.toLowerCase()].token).to.equal(token);
                }
            } finally {
                await this.page.select('#algorithm-select', 'HS256');
            }
        });

    it('Should display a tooltip for a claim', async function() {
        await this.page.select('#algorithm-select', 'HS384');

        await this.page.mouse.move(0, 0);

        function tippyVisible(element) {
            return element._tippy.state.visible;
        }

        expect(await this.page.$eval('[data-tippy]', tippyVisible)).
        to.be.false;

        const iatPos = await this.page.evaluate(() => {
            return window.test.payloadEditor.charCoords({
                line: 4,
                pos: 3
            }, 'window');
        });

        await this.page.mouse.move(iatPos.left, iatPos.top);

        // Wait for animation
        await this.page.waitFor(2000);

        expect(await this.page.$eval('[data-tippy]', tippyVisible))
            .to.be.true;
    });

    it('Displays a valid token by default', async function() {
        const valid = await this.page.$eval('.validation-status', status => {
            return status.classList.contains('valid-token') &&
                status.textContent.indexOf('verified') !== -1;
        });

        expect(valid).to.be.true;
    });

    it('Shows invalid token when a valid token is edited ' +
        'in the left pane', async function() {
            await this.page.evaluate(() => {
                let token = window.test.tokenEditor.getValue();
                token += 'asdf23';
                window.test.tokenEditor.setValue(token);
            });

            // Wait for token processing.
            await this.page.waitFor(tokenProcessingWait);

            const invalid = await this.page.$eval('.validation-status', status => {
                return status.classList.contains('invalid-token') &&
                    status.textContent.indexOf('invalid') !== -1;
            });

            expect(invalid).to.be.true;
        });

    it('Updates the token when the header is edited', async function() {
        const oldToken = await this.page.evaluate(() => {
            return window.test.tokenEditor.getValue()
        });

        await this.page.click('.js-header');
        await selectAll.call(this);

        const header = {
            alg: 'HS256',
            typ: 'JWT',
            test: 'test'
        };
        await this.page.keyboard.type(JSON.stringify(header, null, 2), {
            delay: typingDelay
        });

        // Wait for token processing.
        await this.page.waitFor(tokenProcessingWait);
        await this.page.waitFor(tokenEditorThrottleWait);

        const newToken = await this.page.evaluate(() => {
            return window.test.tokenEditor.getValue();
        });

        expect(newToken).to.not.equal(oldToken);

        const valid = await this.page.$eval('.validation-status', status => {
            return status.classList.contains('valid-token') &&
                status.textContent.indexOf('verified') !== -1;
        });

        expect(valid).to.be.true;
    });

    it('Updates the token when the payload is edited', async function() {
        const oldToken = await this.page.evaluate(() => {
            return window.test.tokenEditor.getValue()
        });

        await this.page.click('.js-payload');
        await selectAll.call(this);

        const payload = {
            "sub": "1234567890",
            "name": "John Doe",
            "admin": true,
            "iat": 1516239022,
            "test": "test"
        };
        await this.page.keyboard.type(JSON.stringify(payload, null, 2), {
            delay: typingDelay
        });

        // Wait for token processing.
        await this.page.waitFor(tokenProcessingWait);
        await this.page.waitFor(tokenEditorThrottleWait);

        const newToken = await this.page.evaluate(() => {
            return window.test.tokenEditor.getValue()
        });

        expect(newToken).to.not.equal(oldToken);

        const valid = await this.page.$eval('.validation-status', status => {
            return status.classList.contains('valid-token') &&
                status.textContent.indexOf('verified') !== -1;
        });

        expect(valid).to.be.true;
    });

    it('Selects algorithm when header is edited', async function() {
        const selectedBefore =
            await this.page.$eval('#algorithm-select', select => {
                return select.options[select.selectedIndex].value;
            });

        await this.page.click('.js-header');
        await selectAll.call(this);

        const header = {
            alg: 'HS384',
            typ: 'JWT',
        };
        await this.page.keyboard.type(JSON.stringify(header, null, 2), {
            delay: typingDelay
        });

        // Wait for token processing.
        await this.page.waitFor(tokenProcessingWait);
        await this.page.waitFor(tokenEditorThrottleWait);

        const selectedAfter =
            await this.page.$eval('#algorithm-select', select => {
                return select.options[select.selectedIndex].value;
            });

        expect(selectedBefore).to.not.equal(selectedAfter);
        expect(selectedAfter).to.equal('HS384');

        // Wait for token processing.
        await this.page.waitFor(tokenProcessingWait);
        await this.page.waitFor(tokenEditorThrottleWait);

        const valid = await this.page.$eval('.validation-status', status => {
            return status.classList.contains('valid-token') &&
                status.textContent.indexOf('verified') !== -1;
        });

        expect(valid).to.be.true;
    });

    it('Should never revert to a default token after a non-default token ' +
        'is generated', async function() {
            await this.page.select('#algorithm-select', 'HS256');

            await this.page.click('.js-payload');
            await selectAll.call(this);

            const payload = {
                sub: 'test'
            };
            await this.page.keyboard.type(JSON.stringify(payload, null, 2), {
                delay: typingDelay
            });

            const algs = await this.page.$eval('#algorithm-select', select => {
                return Array.prototype.map.call(select.options, opt => opt.value);
            });

            for (const alg of algs) {
                await this.page.select('#algorithm-select', alg);
            }

            // Wait for token processing.
            await this.page.waitFor(tokenProcessingWait);

            const payloadInEditor = await this.page.evaluate(() => {
                return JSON.parse(window.test.payloadEditor.getValue());
            });

            expect(payload).to.deep.equal(payloadInEditor);
        });

    describe('HMAC', function() {
        before(async function() {
            await this.page.select('#algorithm-select', 'HS256');
        });

        it('Updates the token when the secret changes', async function() {
            const oldToken = await this.page.evaluate(() => {
                return window.test.tokenEditor.getValue()
            });

            const secretInput = await this.page.$('input[name="secret"]');

            await secretInput.type('asdfasdf');

            // Wait for token processing.
            await this.page.waitFor(tokenProcessingWait);

            const newToken = await this.page.evaluate(() => {
                return window.test.tokenEditor.getValue()
            });

            expect(oldToken).to.not.equal(newToken);
        });

        it('Updates the token when the Base64 checkbox changes', async function() {
            const oldToken = await this.page.evaluate(() => {
                return window.test.tokenEditor.getValue()
            });

            await this.page.click('#is-base64-encoded');

            // Wait for token processing.
            await this.page.waitFor(tokenProcessingWait);

            let newToken = await this.page.evaluate(() => {
                return window.test.tokenEditor.getValue()
            });

            expect(oldToken).to.not.equal(newToken);

            await this.page.click('#is-base64-encoded');

            // Wait for token processing.
            await this.page.waitFor(tokenProcessingWait);

            newToken = await this.page.evaluate(() => {
                return window.test.tokenEditor.getValue()
            });

            expect(oldToken).to.equal(newToken);
        });

        describe('HS256/384/512', function() {
            const algs = Object.keys(defaultTokens).filter(alg => alg.includes('hs'));

            for (const alg of algs) {
                it(`Decodes ${alg.toUpperCase()} tokens`, async function() {
                    const secretInput = await this.page.$('input[name="secret"]');
                    await secretInput.click();
                    await selectAll.call(this);
                    await secretInput.type(defaultTokens[alg].secret);

                    await this.page.click('.js-input');
                    await selectAll.call(this);
                    await this.page.keyboard.type(defaultTokens[alg].token);

                    // Wait for token processing.
                    await this.page.waitFor(tokenProcessingWait);
                    await this.page.waitFor(tokenEditorThrottleWait);

                    const valid = await this.page.$eval('.validation-status', status => {
                        return status.classList.contains('valid-token') &&
                            status.textContent.indexOf('verified') !== -1;
                    });

                    expect(valid).to.be.true;
                });

                const bits = parseInt(alg.substr(2));
                it(`Considers less-than-${bits}-bit secrets weak`,
                    async function() {
                        let secret = _.pad('', (bits / 8) - 1, 'test');

                        const secretInput = await this.page.$('input[name="secret"]');
                        await secretInput.click();
                        await selectAll.call(this);
                        await secretInput.type(secret, {
                            delay: typingDelay
                        });

                        // Wait for animations
                        await this.page.waitFor(500);

                        let tooltipVisible =
                            await this.page.$eval('input[name="secret"]', input => {
                                return input._tippy.state.visible;
                            });

                        expect(tooltipVisible).to.be.true;

                        secret += 'test';
                        await secretInput.click();
                        await selectAll.call(this);
                        await secretInput.type(secret, {
                            delay: typingDelay
                        });

                        // Wait for animations
                        await this.page.waitFor(500);

                        tooltipVisible =
                            await this.page.$eval('input[name="secret"]', input => {
                                return input._tippy.state.visible;
                            });

                        expect(tooltipVisible).to.be.false;
                    });
            }
        });

        it('Signs tokens with an empty secret', async function() {
            const secretInput = await this.page.$('input[name="secret"]');
            await secretInput.click();
            await selectAll.call(this);
            await this.page.keyboard.press('Delete');

            // Wait for token processing.
            await this.page.waitFor(tokenProcessingWait);

            const valid = await this.page.$eval('.validation-status', status => {
                return status.classList.contains('valid-token') &&
                    status.textContent.indexOf('verified') !== -1;
            });

            expect(valid).to.be.true;
        });
    });

    describe('Public-key', function() {
        describe('Decodes RS/ES/PS tokens', function() {
            const algs = Object.keys(defaultTokens).filter(alg => !alg.includes('hs'));

            for (const alg of algs) {
                for (const format of['pem', 'jwk']) {
                    it(`${alg.toUpperCase()} using a ${format.toUpperCase()} key`, async function() {
                        await this.page.click('.js-input');
                        await selectAll.call(this);
                        await this.page.keyboard.type(defaultTokens[alg].token);

                        const secretInput = await this.page.$('textarea[name="public-key"]');
                        await secretInput.click();
                        await selectAll.call(this);

                        let publicKey = defaultTokens[alg].publicKey;
                        if (format === 'jwk') {
                            publicKey = JSON.stringify(defaultTokens[alg].jwk)
                        }

                        await secretInput.type(publicKey);

                        // Wait for token processing.
                        await this.page.waitFor(tokenProcessingWait);
                        await this.page.waitFor(tokenEditorThrottleWait);

                        const valid = await this.page.$eval('.validation-status', status => {
                            return status.classList.contains('valid-token') &&
                                status.textContent.indexOf('verified') !== -1;
                        });

                        expect(valid).to.be.true;
                    });
                }
            }
        });

        describe('Encodes RS/ES/PS tokens', function() {
            const algs = Object.keys(defaultTokens).filter(alg => !alg.includes('hs'));

            for (const alg of algs) {
                for (const format of['pem', 'jwk']) {
                    it(`${alg.toUpperCase()} using a ${format.toUpperCase()} key`, async function() {
                        await this.page.select('#algorithm-select', alg.toUpperCase());

                        let publicKey = defaultTokens[alg].publicKey;
                        if (format === 'jwk') {
                            publicKey = JSON.stringify(defaultTokens[alg].jwk)
                        }

                        let privateKey = defaultTokens[alg].privateKey;
                        if (format === 'jwk') {
                            privateKey = JSON.stringify(defaultTokens[alg].jwk)
                        }

                        await this.page.click('textarea[name="public-key"]');
                        await selectAll.call(this);
                        await this.page.keyboard.type(publicKey, {
                            delay: typingDelay
                        });

                        await this.page.click('textarea[name="private-key"]');
                        await selectAll.call(this);
                        await this.page.keyboard.type(privateKey, {
                            delay: typingDelay
                        });

                        await this.page.evaluate(token => {
                            window.test.tokenEditor.setValue(token);
                        }, defaultTokens[alg].token);

                        await this.page.select('#algorithm-select', alg.toUpperCase());

                        await this.page.click('.js-header');
                        await selectAll.call(this);
                        await this.page.keyboard.type(JSON.stringify({
                            alg: alg.toUpperCase(),
                            typ: 'JWT'
                        }, null, 2), {
                            delay: typingDelay
                        });

                        await this.page.click('.js-payload');
                        await selectAll.call(this);
                        await this.page.keyboard.type(JSON.stringify({
                            sub: 'test'
                        }, null, 2), {
                            delay: typingDelay
                        });

                        // Wait for token processing.
                        await this.page.waitFor(tokenProcessingWait);
                        await this.page.waitFor(tokenEditorThrottleWait);

                        const newToken = await this.page.evaluate(() => {
                            return window.test.tokenEditor.getValue();
                        });

                        expect(newToken).to.not.be.empty;

                        const valid = await this.page.$eval('.validation-status',
                            status => {
                                return status.classList.contains('valid-token') &&
                                    status.textContent.indexOf('verified') !== -1;
                            });

                        expect(valid).to.be.true;
                    });
                }
            }
        });

        describe('Should download public-keys when possible', function() {
            before(async function() {
                this.app = express();

                this.app.get('/.well-known/openid-configuration', (req, res) => {
                    res.set('Access-Control-Allow-Origin', '*');
                    res.json({
                        jwks_uri: 'http://localhost:3000/.well-known/jwks.json'
                    });
                });

                this.app.get('/.well-known/jwks.json', (req, res) => {
                    res.set('Access-Control-Allow-Origin', '*');
                    res.json(jwks);
                });

                this.server = this.app.listen(3000);

                await this.page.select('#algorithm-select', 'RS256');
            });

            beforeEach(async function() {
                const publicKeyInput = await this.page.$('textarea[name="public-key"]');
                await publicKeyInput.click();
                await selectAll.call(this);
                await this.page.keyboard.press('Delete');
            });

            after(function() {
                this.server.close();
            });

            it('iss URL + .well-known', async function() {
                const key = await jose.importPKCS8(defaultTokens.rs256.privateKey, 'RS256');
                const token = await new jose.CompactSign(Buffer.from(JSON.stringify({
                    sub: 'test',
                    iss: 'http://localhost:3000/'
                }))).setProtectedHeader({
                    alg: 'RS256',
                    typ: 'JWT',
                    kid: '1'
                }).sign(key);

                await this.page.click('.js-input');
                await selectAll.call(this);
                await this.page.keyboard.type(token);

                await this.page.waitFor(2000);
                await this.page.waitFor(tokenEditorThrottleWait);

                const publicKey = await this.page.$eval('textarea[name="public-key"]',
                    publicKeyElement => publicKeyElement.value);

                expect(jwks.keys[0]).to.contain(JSON.parse(publicKey))
            });

            it('jku', async function() {
                //this.timeout(20000);

                const key = await jose.importPKCS8(defaultTokens.rs256.privateKey, 'RS256');
                const token = await new jose.CompactSign(Buffer.from(JSON.stringify({
                    sub: 'test'
                }))).setProtectedHeader({
                    alg: 'RS256',
                    typ: 'JWT',
                    kid: '1',
                    jku: 'http://localhost:3000/.well-known/jwks.json'
                }).sign(key);

                await this.page.click('.js-input');
                await selectAll.call(this);
                await this.page.keyboard.type(token);

                await this.page.waitFor(2000);
                await this.page.waitFor(tokenEditorThrottleWait);

                const publicKey = await this.page.$eval('textarea[name="public-key"]',
                    publicKeyElement => publicKeyElement.value);

                expect(jwks.keys[0]).to.contain(JSON.parse(publicKey))
            });

            it('x5c', async function() {
                //this.timeout(35000);

                const key = await jose.importPKCS8(defaultTokens.rs256.privateKey, 'RS256');
                const token = await new jose.CompactSign(Buffer.from(JSON.stringify({
                    sub: 'test'
                }))).setProtectedHeader({
                    alg: 'RS256',
                    typ: 'JWT',
                    x5c: jwks.keys[0].x5c
                }).sign(key);

                await this.page.click('.js-input');
                await selectAll.call(this);
                await this.page.keyboard.type(token);

                await this.page.waitFor(2000);

                const publicKey = await this.page.$eval('textarea[name="public-key"]',
                    publicKeyElement => publicKeyElement.value);

                expect(publicKey).to.include('-----BEGIN CERTIFICATE-----\nMIIDBjCCAe4CCQDOaPo3zzlhlzANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJV\nUzETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0\ncyBQdHkgTHRkMB4XDTE5MDYwNTEwMDg0OVoXDTIwMDYwNDEwMDg0OVowRTELMAkG\nA1UEBhMCVVMxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoMGEludGVybmV0\nIFdpZGdpdHMgUHR5IEx0ZDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB\nAJ88orNWY3zQdGwYChTEr75E7cJbwbGiau0ucAPpM3lTlaVVsJFnVYWuLN/FzP6W\nv8q+O2r+/s91U5rw0cgB3Gk/dsIURBaS7/XI+ZU3iUom8q/zK5v2LYwmVVoGjmCI\ncK18Ci6j6/9dYp1rAJHyMrbx1k8WWBHFy4AFxblLmkt7hfYBIjUMMxk1Nb9BapKk\nwa+AfJ1txwjeO11LtLfGNHvpX+LODsUGsFg+/Sff+Xd0ctL21dwJtRbRiYibzsEb\nCH1QoQ6WErU3B0wjKrb1m1ei9dQVpKcxl0luB7+N6mvhkmDg9kFOvDG+faEpNjgf\ngbTi6SaH5mxhBoL5sMgiPTMCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAU4Nx25sl\niX8gD10Oik+RpBpHmsuZBU6q3nqYQKMlVdKFVeuptdqNjnVZY0WSSYvAUdtZ1kCu\nkMxjhvPb+LVaCkfOfXEuSqyjN55C1vDLpCV0xMb3irltYaWRIeHkqlRxRmoS+569\nZ/qg+JqZnCuEc6CeLLkzhVq+zagJkJs3evpSmofrY4qzJ1s1rygqSUhyS5NoyGAX\nCHba+m+7qMuSC3yOEPfiuAh9h6D/RltGi1iQ9Yqi4DoKlW9mfKGXbDn8thkGNdc7\n6yffilC8B/7Q8d5Btox/fE9yNI4YVhUEo+MkvUMnT1KS9fbw0o6fTjSa0D2oaHSO\nyBSs097rzC1PIw==\n-----END CERTIFICATE-----');
            });
        });

        it('Clears the token when the header is edited and there ' +
            'is no private key', async function() {
                await this.page.select('#algorithm-select', 'RS256');

                const secretInput = await this.page.$('textarea[name="private-key"]');
                await secretInput.click();
                await selectAll.call(this);
                await this.page.keyboard.press('Delete');

                await this.page.click('.js-header');
                await selectAll.call(this);

                const header = {
                    alg: 'RS256',
                    typ: 'JWT',
                    test: 'test'
                };
                await this.page.keyboard.type(JSON.stringify(header, null, 2), {
                    delay: typingDelay
                });

                // Wait for token processing.
                await this.page.waitFor(tokenProcessingWait);

                const token = await this.page.evaluate(() => {
                    return window.test.tokenEditor.getValue();
                });

                expect(token).to.be.empty;
            });

        it('Clears the token when the payload is edited and there ' +
            'is no private key', async function() {
                await this.page.select('#algorithm-select', 'RS256');

                const secretInput = await this.page.$('textarea[name="private-key"]');
                await secretInput.click();
                await selectAll.call(this);
                await this.page.keyboard.press('Delete');

                await this.page.click('.js-payload');
                await selectAll.call(this);

                const payload = {
                    sub: 'test'
                };
                await this.page.keyboard.type(JSON.stringify(payload, null, 2), {
                    delay: typingDelay
                });

                // Wait for token processing.
                await this.page.waitFor(tokenProcessingWait);

                const token = await this.page.evaluate(() => {
                    return window.test.tokenEditor.getValue();
                });

                expect(token).to.be.empty;
            });

        it('Marks token as invalid when there is no public key', async function() {
            //this.timeout(20000);
            await this.page.waitFor(tokenEditorThrottleWait);
            await this.page.select('#algorithm-select', 'RS256');

            await this.page.click('.js-input');
            await selectAll.call(this);
            await this.page.keyboard.type(defaultTokens['rs256'].token);

            const secretInput = await this.page.$('textarea[name="public-key"]');
            await secretInput.click();
            await selectAll.call(this);
            await secretInput.type(defaultTokens['rs256'].publicKey);

            // Wait for token processing.
            await this.page.waitFor(tokenProcessingWait);
            await this.page.waitFor(tokenEditorThrottleWait);

            const valid = await this.page.$eval('.validation-status', status => {
                return status.classList.contains('valid-token') &&
                    status.textContent.indexOf('verified') !== -1;
            });

            expect(valid).to.be.true;

            await secretInput.click();
            await selectAll.call(this);
            await this.page.keyboard.press('Delete');

            // Wait for token processing.
            await this.page.waitFor(tokenProcessingWait);
            await this.page.waitFor(tokenEditorThrottleWait);

            const invalid = await this.page.$eval('.validation-status', status => {
                return status.classList.contains('invalid-token') &&
                    status.textContent.indexOf('invalid') !== -1;
            });

            expect(invalid).to.be.true;
        });

        it('Marks token as invalid when the public key is wrong', async function() {
            //this.timeout(20000);

            await this.page.select('#algorithm-select', 'RS256');

            await this.page.click('.js-input');
            await selectAll.call(this);
            await this.page.keyboard.type(defaultTokens['rs256'].token);

            const secretInput = await this.page.$('textarea[name="public-key"]');
            await secretInput.click();
            await selectAll.call(this);
            await secretInput.type(defaultTokens['rs256'].publicKey);

            // Wait for token processing.
            await this.page.waitFor(tokenProcessingWait);
            await this.page.waitFor(tokenEditorThrottleWait);

            const valid = await this.page.$eval('.validation-status', status => {
                return status.classList.contains('valid-token') &&
                    status.textContent.indexOf('verified') !== -1;
            });

            expect(valid).to.be.true;

            await secretInput.click();
            await this.page.keyboard.type('sdfasdf389972389', {
                delay: typingDelay
            });

            // Wait for token processing.
            await this.page.waitFor(tokenProcessingWait);

            const invalid = await this.page.$eval('.validation-status', status => {
                return status.classList.contains('invalid-token') &&
                    status.textContent.indexOf('invalid') !== -1;
            });

            expect(invalid).to.be.true;
        });

        it('Marks token as valid when the public key is OK and private ' +
            'key is wrong', async function() {
                //this.timeout(30000);

                await this.page.select('#algorithm-select', 'RS256');

                const secretInput = await this.page.$('textarea[name="public-key"]');
                await secretInput.click();
                await selectAll.call(this);
                await secretInput.type(defaultTokens['rs256'].publicKey, {
                    delay: typingDelay
                });

                const privateKeyInput = await this.page.$('textarea[name="private-key"]');
                await privateKeyInput.click();
                await selectAll.call(this);

                const head = defaultTokens['rs256'].privateKey.slice(0, 20);
                const tail = defaultTokens['rs256'].privateKey.slice(20);

                await privateKeyInput.type(`${head}sadfasdf${tail}`, {
                    delay: typingDelay
                });

                await this.page.click('.js-input');
                await selectAll.call(this);
                await this.page.keyboard.type(defaultTokens['rs256'].token, {
                    delay: typingDelay
                });

                await this.page.waitFor(1000);

                const valid = await this.page.$eval('.validation-status', status => {
                    return status.classList.contains('valid-token') &&
                        status.textContent.indexOf('verified') !== -1;
                });

                expect(valid).to.be.true;
            });

        it('Marks token as valid when the public key is OK and private ' +
            'key is missing', async function() {
                //this.timeout(30000);

                await this.page.select('#algorithm-select', 'RS256');

                const secretInput = await this.page.$('textarea[name="public-key"]');
                await secretInput.click();
                await selectAll.call(this);
                await secretInput.type(defaultTokens['rs256'].publicKey);

                const privateKeyInput = await this.page.$('textarea[name="private-key"]');
                await privateKeyInput.click();
                await selectAll.call(this);
                await this.page.keyboard.press('Delete');

                await this.page.click('.js-input');
                await selectAll.call(this);
                await this.page.keyboard.type(defaultTokens['rs256'].token);

                await this.page.waitFor(1000);

                const valid = await this.page.$eval('.validation-status', status => {
                    return status.classList.contains('valid-token') &&
                        status.textContent.indexOf('verified') !== -1;
                });

                expect(valid).to.be.true;
            });
    });

    it('Updates the header when the token algorithm ' +
        'is changed', async function() {
            await this.page.select('#algorithm-select', 'HS256');

            await this.page.click('.js-input');
            await selectAll.call(this);
            await this.page.keyboard.type(defaultTokens.hs256.token);

            await this.page.select('#algorithm-select', 'HS384');

            const header = await this.page.evaluate(() => {
                return JSON.parse(window.test.headerEditor.getValue());
            });

            expect(header.alg).to.equal('HS384');
        });

    it('Marks token as invalid when "alg" is "none"', async function() {
        //this.timeout(20000);

        await this.page.click('.js-input');
        await selectAll.call(this);
        await this.page.keyboard.type('eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.');

        // Wait for token processing.
        await this.page.waitFor(tokenProcessingWait);

        const invalid = await this.page.$eval('.validation-status', status => {
            return status.classList.contains('invalid-token') &&
                status.textContent.indexOf('invalid') !== -1;
        });

        expect(invalid).to.be.true;
    });

    it('Does NOT save the last edited token', async function() {
        await this.page.select('#algorithm-select', 'HS256');

        const secretInput = await this.page.$('input[name="secret"]');
        await secretInput.click();
        await selectAll.call(this);
        await secretInput.type('secret-test', {
            delay: typingDelay
        });

        await this.page.click('.js-payload');
        await selectAll.call(this);

        const payload = {
            sub: 'test'
        };
        await this.page.keyboard.type(JSON.stringify(payload, null, 2), {
            delay: typingDelay
        });

        await this.page.reload();

        const storedPayload = await this.page.evaluate(() => {
            return JSON.parse(window.test.payloadEditor.getValue());
        });

        expect(storedPayload).to.not.deep.equal(payload);
    });

    describe('JWT share button', function() {
        it('Copies an HMAC token to the clipboard (no secret)', async function() {
            await this.page.select('#algorithm-select', 'HS256');

            const secretInput = await this.page.$('input[name="secret"]');
            await secretInput.click();
            await selectAll.call(this);
            await secretInput.type('secret-test', {
                delay: typingDelay
            });

            await this.page.click('.js-payload');
            await selectAll.call(this);

            const payload = {
                sub: 'test'
            };
            await this.page.keyboard.type(JSON.stringify(payload, null, 2), {
                delay: typingDelay
            });

            await this.page.waitFor(tokenEditorThrottleWait);

            const shareJwtButton = await this.page.$('.website-share button');
            await shareJwtButton.click();

            const srcToken = await this.page.evaluate(() =>
                window.test.tokenEditor.getValue());

            // We cannot read the clipboard in headless Chrome, so we have a special
            // harness in the code that stores this value. See:
            // https://github.com/GoogleChrome/puppeteer/issues/2147
            const copiedUrl = await this.page.evaluate(() =>
                window.test.shareJwtCopiedUrl);

            const newPage = await this.browser.newPage();
            await newPage.goto(
                copiedUrl.replace('https://jwt.io', 'http://localhost:8000'));

            const destToken = await newPage.evaluate(() =>
                window.test.tokenEditor.getValue());
            const destSecret = await newPage.$eval('input[name="secret"]', input =>
                input.value);

            expect(srcToken).to.equal(destToken);
            expect(destSecret).to.not.equal('secret-test');
        });

        it('Copies an RSA token to the clipboard (with public-key)',
            async function() {
                //this.timeout(30000);

                await this.page.select('#algorithm-select', 'RS256');

                await this.page.click('.js-input');
                await selectAll.call(this);
                await this.page.keyboard.type(defaultTokens['rs256'].token, {
                    delay: typingDelay
                });

                const pubKeyInput = await this.page.$('textarea[name="public-key"]');
                await pubKeyInput.click();
                await selectAll.call(this);
                await pubKeyInput.type(defaultTokens['rs256'].publicKey, {
                    delay: typingDelay
                });

                const privateKeyInput =
                    await this.page.$('textarea[name="private-key"]');
                await privateKeyInput.click();
                await selectAll.call(this);
                await privateKeyInput.type(defaultTokens['rs256'].privateKey, {
                    delay: typingDelay
                });

                await this.page.click('.js-payload');
                await selectAll.call(this);

                const payload = {
                    sub: 'test'
                };
                await this.page.keyboard.type(JSON.stringify(payload, null, 2), {
                    delay: typingDelay
                });

                await this.page.waitFor(tokenEditorThrottleWait);

                const shareJwtButton = await this.page.$('.website-share button');
                await shareJwtButton.click();

                const srcToken = await this.page.evaluate(() =>
                    window.test.tokenEditor.getValue());

                // We cannot read the clipboard in headless Chrome, so we have a
                // special harness in the code that stores this value. See:
                // https://github.com/GoogleChrome/puppeteer/issues/2147
                const copiedUrl = await this.page.evaluate(() =>
                    window.test.shareJwtCopiedUrl);

                const newPage = await this.browser.newPage();
                await newPage.goto(
                    copiedUrl.replace('https://jwt.io', 'http://localhost:8000'));

                const destToken = await newPage.evaluate(() =>
                    window.test.tokenEditor.getValue());
                const destPubKey = await newPage.$eval('textarea[name="public-key"]',
                    input => input.value);

                expect(srcToken).to.equal(destToken);
                expect(destPubKey).to.equal(defaultTokens['rs256'].publicKey);
            }
        );
    });

    describe('Parses tokens from window.location.href', () => {
        const token = defaultTokens.hs384.token;

        ['token', 'value', 'id_token', 'access_token'].forEach((key) => {

            [
                `/?${key}=${token}`,
                `/#${key}=${token}`,
                `/?foo=bar&${key}=${token}`,
                `/#foo=bar&${key}=${token}`
            ].forEach((searchStr, i) => {
                //this.timeout(20000);

                it(`Should parse ${key} from window.location.href [${i}]`,
                    async function() {
                        const page = await this.browser.newPage();

                        await page.goto(`http://localhost:8000${searchStr}`);

                        expect(await page.evaluate(() => {
                            return window.test.tokenEditor.getValue();
                        })).to.equal(token);

                        await page.close();
                    });
            });

        });

        it('Parses shared token', async function() {
            //this.timeout(20000);

            const page = await this.browser.newPage();

            await page.goto(`http://localhost:8000/#debugger-io?token=${token}`);

            expect(await page.evaluate(() => {
                return window.test.tokenEditor.getValue();
            })).to.equal(token);

            await page.close();
        });

    });
});