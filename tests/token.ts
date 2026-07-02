import { expect } from 'chai'
import {
	buildStreamingToken,
	coreHostFromOfferingSettings,
	defaultXHomeCoreHost,
	marketFromLanguage,
	normalizeCatalogLanguage,
	resolveStreamingTokenData,
	streamHostFromCoreHost
} from '../src/streaming/token.ts'

describe('streaming token', () => {
	it('marketFromLanguage maps locale regions', function () {
		expect(marketFromLanguage('en-US')).to.equal('US')
		expect(marketFromLanguage('ru-RU')).to.equal('RU')
		expect(marketFromLanguage('de')).to.equal('US')
	})

	it('buildStreamingToken falls back to locale market and xhome host', function () {
		expect(buildStreamingToken({ gsToken: 'abc' }, 'ru-RU')).to.deep.equal({
			market: 'RU',
			language: 'ru-RU',
			token: 'abc',
			coreHost: defaultXHomeCoreHost('RU')
		})
	})

	it('normalizeCatalogLanguage formats locale tags', function () {
		expect(normalizeCatalogLanguage('en-us')).to.equal('en-US')
		expect(normalizeCatalogLanguage('ru-RU')).to.equal('ru-RU')
	})

	it('marketFromLanguage tolerates missing language', function () {
		expect(marketFromLanguage(undefined)).to.equal('US')
		expect(marketFromLanguage('')).to.equal('US')
	})

	it('resolveStreamingTokenData reads nested and flat token shapes', function () {
		expect(
			resolveStreamingTokenData({
				data: { gsToken: 'nested', market: 'US' }
			})
		).to.deep.equal({ gsToken: 'nested', market: 'US' })
		expect(resolveStreamingTokenData({ gsToken: 'flat', market: 'RU' })).to.deep.equal({
			gsToken: 'flat',
			market: 'RU'
		})
	})

	it('coreHostFromOfferingSettings picks default region', function () {
		expect(
			coreHostFromOfferingSettings({
				regions: [
					{ baseUri: 'https://weu.core.gssv-play-prod.xboxlive.com', isDefault: false },
					{ baseUri: 'https://uks.core.gssv-play-prodxhome.xboxlive.com', isDefault: true }
				]
			})
		).to.equal('uks.core.gssv-play-prodxhome.xboxlive.com')
	})

	it('streamHostFromCoreHost normalizes host', function () {
		expect(streamHostFromCoreHost('uks.core.gssv-play-prod.xboxlive.com')).to.equal(
			'https://uks.core.gssv-play-prod.xboxlive.com'
		)
	})
})