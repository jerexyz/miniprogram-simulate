const path = require('path')
const simulate = require('../../index')

test('comp2', () => {
    const id = simulate.load(path.join(__dirname, './index'), 'custom-comp')
    const comp = simulate.render(id, {prop: 'index.test.properties'})

    const parent = document.createElement('parent-wrapper')
    comp.attach(parent)

    expect(simulate.match(comp.dom, `
        <wx-view class="custom-comp--index">index.test.properties</wx-view>
        <other-comp class="custom-comp--other"><wx-view class="other-comp--index">other.properties</wx-view></other-comp>
    `)).toBe(true)
    expect(window.getComputedStyle(comp.querySelector('.index').dom).color).toBe('green')
    expect(window.getComputedStyle(comp.querySelector('.other').querySelector('.index').dom).color).toBe('yellow')
    expect(comp.dom.tagName).toBe('CUSTOM-COMP')
})
