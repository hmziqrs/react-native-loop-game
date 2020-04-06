describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Welcome', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });
});
