# Conference Timer

> Communicate presentation and Q&A times to your speakers at your event.

If you have ever been at a conference, you probably know how difficult it can be
to keep your time; and you probably have experienced speakers overshooting their
allotted time. Conference Timer is a tool intended to make managing time for
conference presentations easier.

There are three primary issues that make keeping time difficult both as a
session chair and a speaker:

1. Managing time as a speaker demands additional mental resources
2. Holding up "x minutes left"-signs from a back seat can look awkward
3. At many conferences, there are usually no professional time keeping systems

Conference Timer has been developed with common conference setups in mind and
balances the scarce resources we often have at conferences (at least an internet
enabled device with a screen, that is, a laptop or tablet) with the mental
capacities of a speaker.

Conference Timer offers three benefits over other common time keeping methods:

1. It can be configured for any presentation length within a few seconds and is
   ready to go instantly.
2. It offers very simple and fast-to-understand visual cues to inform speakers
   of their remaining time.
3. It can be run in any setup which includes a display and an internet browser.

## Features

* Focus on speed and ease of use
* Many built-in templates with and without dedicated Q&A time for:
  * lightning talks;
  * short and regular conference presentations;
  * keynotes
* Create custom templates for your own conference
* Auto-fullscreen capability, and prevents the display from sleeping while the
  timer is running
* Full control (start, pause, resume, stop, restart)
* Instructions for
  [conference organizers](#instructions-for-conference-organizers),
  [session chairs](#instructions-for-session-chairs), and
  [speakers](#instructions-for-speakers)

## Getting Started

To get started, visit the Conference Timer website, and either select a
predefined template, or create your own. If you create your own template, you
can copy a link to it to share with, e.g., all of your session chairs to use.

After you have selected a template, you are redirected to the timer screen. If
you have several screens, you should now move the browser window onto the screen
where it should appear.

Now, press the "Play"-button or the spacebar to immediately start the timer. The
app will now enter fullscreen and request your computer not to put its display
to sleep.

While the timer is running, it will show several pieces of information:

* In the center, it will show the countdown, that is the remaining time for the
  current phase. If the template is set to count up, the counter will go up
  instead of counting down. If the template hides the counter, it will only show
  "Presentation" during the presentation phase, and "Q&A" during the Q&A phase.
* In the top left, you have the timer control buttons, allowing you to pause or
  resume, or stop the timer.
* In the top center, the app will show a warning if it couldn't acquire a wake
  lock, that is, if the display may go to sleep during the presentation.
* In the top right, you can exit the timer and return to the home screen.
* The bottom left shows the template name. This can be your custom name.
* The bottom center always shows the total remaining time (presentation + Q&A
  time combined), or counts up to the total time depending on your setting
* The bottom right shows the current phase (presentation or Q&A)

## Instructions for Conference Organizers

As a conference organizer, you may want to prepare one or more templates suited
to your various session or panel times and share them with your session chairs.

If one of the provided default templates work for you, select it on the home
screen to open the timer screen. To share this template with your session
chairs, simply copy the URL and send it to them, e.g., via email.

Creating a custom template works if you either want to display your conference's
name in the bottom-left, or if you want to set custom reminders/times. To do so,
click the button to create a custom template on the home screen, adjust the
settings, and then click on "Copy to clipboard." This will put a link into your
clipboard that contains all your settings. Share this link with your session
chairs. If someone opens the link, this will apply the settings and immediately
redirect them to the correct timer screen so they can start it.

## Instructions for Session Chairs

As a session chair, you should have received instructions from the organizer as
to which template to use. Ideally, they should've sent you a link that you can
just click to open the correct timer template. Otherwise, select the appropriate
template or create a new template and adjust the settings per the organizer's
instructions.

If you have more than one screen at the device you are using for the session
timer, prepare the session by dragging the window with the timer screen onto the
appropriate display that the speaker can see.

Hit the spacebar or click the play button to start the timer. You should do this
once before the session starts to make sure everything works. If it does, click
the stop icon in the top left to reset the timer.

When the first presentation starts, start the timer. After the first
presentation is over and the finish message is shown, you can either press the
stop button in the top left, or wait until the next presentation is set to
start. If you choose to wait, press the spacebar to reset and start the timer
again.

If you need to pause the presentation at some point, e.g., because an unexpected
event is happening, press spacebar to pause the timer. As soon as you press
space again, the timer will resume.

## Instructions for Speakers

If you are a speaker, you can use the timer to estimate and better manage your
allotted time. The app purposefully makes most of the information too tiny to
properly view, as you shouldn't focus on this; it is intended for the session
chairs.

What you should focus on are two elements. First, whatever is displayed in the
center of the screen in large, bold letters. This will either be the countdown
(or count-up), or the name of the current phase (presentation or Q&A). Secondly,
and more importantly, you should take note of the background of the app. The
background will slowly fill with color from left to right as your presentation
progresses.

The background therefore gives you a very fast visual cue as to how much time
you have left. If the background is filled to one third with color during a 15
minute presentation, this represents 5 elapsed minutes. If the color fills half
the screen, your presentation time is half over. Finally, if almost the entire
app's background is filled with color, you should start to wrap up your
presentation.

Some templates add a dedicated space for a Q&A section after your presentation.
Once the app's background has filled and the Q&A section starts, the timer will
reset to show the remaining time of the Q&A phase. Simultaneously, the color
will leave the app background, again from left to right. Once all the color is
gone, the Q&A section is over.

At the very end, you will see a finish message, usually a "Thank you!",
indicating that the time is up.

During the presentation, you will see reminders with either a custom instruction
or the remaining time. Each reminder will be shown for 10 seconds.

## Creating a Custom Template

To create a custom template for your conference, click the appropriate button on
the home screen to enter the wizard. In there, you can adjust the settings for
your template:

* **Name**: Provide a descriptive name for your template.
* **Slug**: The slug cannot be modified, and is derived from the template name.
  This is what the session chairs will see in the address bar of the timer app.
* **Finish Message**: Write a custom "Thank you" message. This should be very
  short, as space is limited!
* **Presentation duration**: Adjust the amount of time for the presentation. You
  can click on one of the provided standard durations, or enter a custom amount.
  You need to set at least 1 minute.
* **Q&A Session duration**: Adjust the amount of time for the Q&A. You can click
  on one of the provided standard durations, or enter a custom amount. If you
  don't want to add a Q&A section, select 0 minutes.
* **Count up**: If this checkbox is checked, the timer will count up, instead of
  counting down.
* **Show timer**: If this checkbox is not checked, the app won't show a big
  timer, and instead only display "Presentation" or "Q&A". This can be helpful
  if you want to avoid inducing stress in the presenters. The background will
  still slowly fill with color, even if this setting is not checked.
* **Reminders**: Add reminders by setting the time mark (counting up from 0)
  when the reminder will be shown, and optionally provide a custom label. Then,
  click on "Add new reminder." If you provide some text, this will be shown at
  the provided time mark. If you don't, the app will show "x minutes remaining".
  To remove a reminder, click the link after its row in the table.

Once you are happy with the settings, you can do one of two things. First, click
the button to copy a link to that specific template to your clipboard. As a
conference organizer, this is a great way to provide your session chairs with it
so they can immediately use it. Second, by clicking "Create template," the
settings will be applied and you will be redirected to the timer screen. This is
the same as clicking the link that has been copied to your clipboard and can be
used to double-check the settings. Note that you need to copy the link to your
clipboard first, because you won't see it again after leaving the page.

## Sharing a Template

Sharing a template works by providing the corresponding URL to your session
chairs. If you use a provided standard template, simply give them the link with
the URL to the timer screen. If you use a custom template, give them the
provided link that contains the configuration amount. The custom link contains
the template slug, making it easy for anyone to quickly identify the correct
template in case you prepare more than one for different types of sessions.

## Contributing

This app is provided as Open Source. It builds on Vue.js 3 with TypeScript and
uses Vite as a bundler. To contribute, you need to have a Node.js environment.
The project uses Yarn, not NPM, for managing dependencies.

Use the following commands to get started:

```sh
git clone https://github.com/nathanlesage/conference-timer # Clone the repository
cd conference-timer # Move into the directory
yarn install --immutable # Install the dependencies
yarn serve # Start the development server
yarn build # Generate the static page
yarn lint # Run ESLint over the code
```

Pull Requests are appreciated.

## License

Copyright (c) 2025 Hendrik Erz <hendrik@zettlr.com>

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

For more information, refer to the [LICENSE](./LICENSE) file.
