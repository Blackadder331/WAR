const expect = chai.expect

describe('testLog', (deck)=> {
    it('check if the game is running', ()=> {
        expect(testLog()).to.equal(console.log('the game is running'))
    })
})


