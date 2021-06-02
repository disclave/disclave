# @disclave/react-plugin

Install Disclave plugin on your website. Allow users to add comments and share what they think.

Learn more on the official Disclave page [https://disclave.com/plugins](https://disclave.com/plugins)

## How to use

Install using npm:

```
npm install @disclave/react-plugin
```

Import:

```
import { DisclaveComments } from '@disclave/react-plugin';
```

Add a component in the place where you want to display Disclave comments:

```
<DisclaveComments />
```

And that is all!

## Configuration

### Hiding the votes

If you want to hide the voting section, you can use the `hideVotes` parameter. If set, Disclave will show only the comments, without total vote sum and voting buttons.

```
<DisclaveComments hideVotes />
```
