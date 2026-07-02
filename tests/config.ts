import { expect } from 'chai'
import { buildStreamConfig, parseStreamRoute } from '../src/streaming/config.ts'

describe('stream config', () => {
	it('parseStreamRoute detects cloud routes', function () {
		expect(parseStreamRoute('xcloud_title-id')).to.deep.equal({
			type: 'cloud',
			id: 'title-id'
		})
	})

	it('parseStreamRoute treats other ids as home console ids', function () {
		expect(parseStreamRoute('F000000000000001')).to.deep.equal({
			type: 'home',
			id: 'F000000000000001'
		})
	})

	it('buildStreamConfig selects host by stream type', function () {
		expect(buildStreamConfig('title', 'cloud', 'en-US', 720)).to.deep.equal({
			id: 'title',
			type: 'cloud',
			language: 'en-US',
			host: 'https://uks.core.gssv-play-prod.xboxlive.com',
			resolution: 720
		})

		expect(buildStreamConfig('F000000000000001', 'home', 'ru-RU', 1080)).to.deep.equal({
			id: 'F000000000000001',
			type: 'home',
			language: 'ru-RU',
			host: 'https://uks.core.gssv-play-prodxhome.xboxlive.com',
			resolution: 1080
		})
	})

	it('buildStreamConfig uses token region when provided', function () {
		expect(
			buildStreamConfig('title', 'cloud', 'en-US', 1080, 'weu.core.gssv-play-prod.xboxlive.com')
		).to.deep.equal({
			id: 'title',
			type: 'cloud',
			language: 'en-US',
			host: 'https://weu.core.gssv-play-prod.xboxlive.com',
			resolution: 1080
		})
	})
})