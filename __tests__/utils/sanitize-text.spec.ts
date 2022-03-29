import { clearFromHTML } from '../../src/utils/sanitize-text';

describe('Sanitize test', () => {
  it.each([
    [
      `<p><a class="user_mention_editor router" href="https://tipalti.monday.com/users/25210588-yaara-wertheim" data-mention-type="User" data-mention-id="25210588" target="_blank" rel="noopener noreferrer">@Yaara Wertheim</a> support are claiming that this happens with more customers. could we put this in the current/next sprint? it shouldn't be a complicated fix</p>`,
      `@Yaara Wertheim support are claiming that this happens with more customers. could we put this in the current/next sprint? it shouldn't be a complicated fix`
    ],
    [
      `<p>sign in to <strong>dev </strong>user: test+finanacialoperationsspecialist__b92f@approve.com<br></p><p>use this purchase for example:</p><p><a href="https://dev.approve.com/purchases/623991f97c67ac001366ebfc" target="_blank" rel="noopener noreferrer">https://dev.approve.com/purchases/623991f97c67ac001366ebfc</a><br></p><p></p><p>when looking at the approval flow you can see the node below has the node name in parentheses:</p><img src="https://tipalti.monday.com/protected_static/1562878/resources/431707496/big-image.png" data-asset_id="431707496"><p>when you open the activity log the name disappears:</p><img src="https://tipalti.monday.com/protected_static/1562878/resources/431707811/big-image.png" data-asset_id="431707811">`,
      `sign in to dev user: test+finanacialoperationsspecialist__b92f@approve.com\nuse this purchase for example:https://dev.approve.com/purchases/623991f97c67ac001366ebfc\nwhen looking at the approval flow you can see the node below has the node name in parentheses:when you open the activity log the name disappears:`,
    ],
    [
      `<p>1. How is it possible that a user who was just invited, create a request? </p><img src="https://tipalti.monday.com/protected_static/1562878/resources/370026068/big-image.png" data-asset_id="370026068"><p></p><p>2. What actions did an "active" user do? </p>`,
      `1. How is it possible that a user who was just invited, create a request? 2. What actions did an "active" user do? `
    ]
  ])('should clear html from text', (input, expected) => {
    expect(clearFromHTML(input)).toEqual(expected);
  });
});
