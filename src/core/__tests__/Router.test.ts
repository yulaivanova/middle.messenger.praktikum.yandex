import {PathRouter} from '../Router/PathRouter';
import Block from '../Block';
import sinon from 'sinon';

describe('core/Store', () => {

  let BlockMock: typeof Block;
  let getContentFake: any;

  const originalForward = window.history.forward;
  const originalBack = window.history.back;

  beforeEach(() => {
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();

    getContentFake = sinon.fake.returns(document.createElement('div'));

    BlockMock = class {
      getContent = getContentFake;
    } as unknown as typeof Block;
  });

  afterEach(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });

  it('Check forward', () => {
    const router = new PathRouter();
    router.forward();

    expect((window.history.forward as any).callCount).toEqual(1);
  });

  it('Check back', () => {
    const router = new PathRouter();
    router.back();

    expect((window.history.back as any).callCount).toEqual(1);
  });

  it('should change the path', () => {
    const router = new PathRouter();
    router
        .use('/', BlockMock)
        .go('test');

    const {pathname} = window.location;

    expect(pathname).toEqual('/test');
  });

});
