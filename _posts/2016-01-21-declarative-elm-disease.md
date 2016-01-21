---
title: Declarative Elm Disease
author: Jason Dryhurst-Smith
canonical: "https://www.jasonds.co.uk/blog/declarative-elm-disease"
layout: post
categories:
  - Engineering
---

# Declarative Elm Disease: DED


> "An effliction apon a host whereby a ravenous parasite seeks to clean up code by redirecting the host's ability to build bidirectional data flow mess and imperatively maintain state, to dev/null" - Me, 01/2016 aka just now.


## What is Elm?

1. Installed with NPM.
2. Compiles to Javascript.
3. Runtime packaged with build files.
4. Strongly typed.
5. Simple module system.
6. Purist functional approach.
7. ????
8. Profit.


## No really, what is Elm?

Elm is a language and a whole bunch of associated development tools, including a package manager and compiler. 

The tools will take your Elm code, all the code that you have selected with the package manager, and then compile it down to Javascript that can then be run in a browser. 

The language is a great strongly typed, immutable by default, functional language, with all the modern trapings that come with that. It is beautifully succinct and has a rich type system of records and unions. 

    type alias Point =        
        { y : Float
        , x : Float
        }

    type Direction = Up | Right | Down | Left

    move : Diretion -> Float -> Point -> Point
    move point direction distance = 
        case direction of 
            Up ->    { point | y = point.y + distance }
            Right -> { point | x = point.x + distance }
            Down ->  { point | y = point.y - distance }
            Left ->  { point | x = point.x - distance }

It also has some neat features like the pipe operator seen a lot in ['F#'](http://www.fsharp.org)... and good old partial application!

    moveDiagonallyDownAndRight point distance =        
        let            
            length = (distance / sqrt(2))
        in
            move Down length point
            |> move Right length

The module system is simple and would be super familiar to anyone who has been fooling around with ES6.

    import Html exposing (div, p, table, tr, th, td)

It has an awesome application framework called StartApp that plays into the hand of the ['Elm Architecture'](https://gist.github.com/evancz/2b2ba366cae1887fe621), that makes building applications really easy and plumments you directly into the ['Pit of Success'](http://blog.codinghorror.com/falling-into-the-pit-of-success/).

Start with some state and fold it into your application and allows you to build UI in a completely functional way and incredibly fast way, using the [virtual DOM](https://github.com/Matt-Esch/virtual-dom) priciples. It can be super lightning quick as we know the data is all immutable, so if a virtual DOM element is *referentially* the same it must be *structurally* the same. Here's what simple application might look like.

    -- All of our lovely types.

    type alias Model = Int

    type Action 
        = Increment 
        | Set Int

    -- StartApp's app bootstrap and out app code.

    app : App Model
    app =
        StartApp.start
            { init = init                   -- Some initial state.
            , update = update               -- Some function to update the state
            , view = view                   -- Some immtable view logic
            , inputs = [ messages.signal ]  -- Our inputs as 'signals' that trigger updates.
            }

    init: Int -> Model
    init count = count

    update : Action -> Model -> Model
    update action model = 
        case action of 
            Increment -> model + 1
            Set value -> value

    view : Signal.Address Action -> Model -> Html
    view address model = 
        div [ button [ onClick address Increment ] [ text "+" ]
            ]


Simple... maybe?

Ok so, it's a bit of a learning curve, but the power at hand is, I hope you can see, overwhelming...


## Can I build forms and does it websocket?

The short answer is yes, and I've been trialing and prototyping to see how this can fit into a wider world of client apps at scale, in both code and use terms. 

But at MarketInvoice we aren't quite ready to fully adopt it as a supported technology in our client apps. 

However. The lessons learned from the Elm architecture and other, new, similar vanilla JS frameworks like ['ReactJS'](https://facebook.github.io/react/), is that uni-directional data flow and reactive UI is the way forward with client applications for the best user experience.

We have been championing these ideas in our angular apps as well and maybe I'll blog about that soon.

One last thing.

Elm also shines really brightly when building things that can be draw on a HTML5 canvas. Which is a standard which is very close ot my heart indeed. Having use D3, Fabric and Kinetic quite a lot in some pretty knarley enterprise projects in the past and some other stuff at [MarketInvoice](http://tech.marketinvoice.com/techradar/#!/).


## Introducing: Foo.bool

So. Seeing as how we all get a day each iteration at MarketInvoice for personal development and projects.

And seeing as how I had been playing with the language a bit.

I thought; "lets build a super cool game that sits on the error page of one of our interal apps as a technology demonstrator".

The product of this day of innovation was a cool little two player football game akin to early versions of sensible soccer, that anyone who gets a little stuck in the app (or finds a bug/unsupported emergent feature (ed - this obviously is very rare a MI)) can while away the time waiting for answers playing football.

Here's a screen shot of the start screen.

![Foo.bool start screen](/content/2016-01-21-declarative-elm-disease/foobool.png)

And another of the game in action.

![Foo.bool action shot](/content/2016-01-21-declarative-elm-disease/foobool-live-action.gif)

The game is written in Elm and sits on the page as a piece of javascript which is then bootstrapped onto an element. This means the UI and the game and our app can all sit perfectly happily side by side.

    -- - Elm.embed: this bootstraps the app.
    --     1. The app sits in the Elm.Main module.
    --     2. The element to attach the ui to is selected from the DOM.
    Elm.embed(Elm.Main, document.getElementById('errorDiv'));

The next steps are of course to add a MMORPG aspect to the game with stats, leader boards, online multiplayer, teams and clans, enhanced animations and graphics....... \*trails off\*