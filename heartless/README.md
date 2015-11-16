## Implementation of n-nested helper tale
See _The Giant with no Heart in his body_ or _Koschei the Deathless_


I'm also still interested in Fairy Tales (see 2014 and the resultant slightly-modified-since-then-but-not-much Malepropp).


In particular, a portion of some tales where the hero befriends several characters/creatures [despite (his) haste or advice] which then end up helping him get through a nested problem. Eg, the giant's heart is kept in a box at the top of a tower on an island in a lake past the thorns, past a guard-dragon, etc etc. I'd like to be able to generate a n-level deep problem with associated helper characters -- each of whom would have to have an attribute matched to solving the problem (bear kills dragon, eagle flies hero over lake, etc.). This would also involve some minimal conversations.

## sample output
 - [rough draft](https://gist.github.com/MichaelPaulukonis/3af142f787db2908d3f0)
 - [second draft](https://gist.github.com/MichaelPaulukonis/24b0b2bc77e546647784) - thanks to @tra38 who [suggested](https://github.com/dariusk/NaNoGenMo-2015/issues/14#issuecomment-155147851) having the prince/hero turn into the giant in the next story. Which I refer to as "sadness".

## TODOs

 1. Make some elements a little more random. For some funs.
 1. DONE "Giant", for instance, could be swapped.
 1. Clean up existing grammar -- use proper [indefinite articles](https://github.com/MichaelPaulukonis/solanasbot03/blob/master/lib/indefinite.js)
 1. Make sure sentences make sense - there's some screwy stuff at end of meetups
 1. better meetups (could involve conversations?)
 1. better "battles"
 1. some pulls from concept-net?
 1. matchup of abilities and environs
 1. environs descriptions = are already better, I think, but... better still.
 1. eh. Maybe this is all a dead-end
 1. should this "just" be integrated into [Malepropp](http://github.com/MichaelPaulukonis/malepropp), instead?
 1. Look at wikipedia's variations (see below)

## examples


For example (and maybe this is the canonical example):

[The Giant Who Had No Heart in His Body](https://en.wikipedia.org/wiki/The_Giant_Who_Had_No_Heart_in_His_Body)

> A king had seven sons, and when the other six went off to find brides,
> he kept the youngest with him because he could not bear to be parted
> from them all. They were supposed to bring back a bride for him, as
> well, but they found a king with six daughters and wooed them,
> forgetting their brother. But when they returned, they passed too
> close to a giant's castle, and he turned them all, both princes and
> princesses, to stone in a fit of rage.
>
> When they did not return, the king, their father, tried to prevent
> their brother from following, but he went. On the way, he gave food to
> a starving raven, helped a salmon back into the river, and gave a
> starving wolf his horse to eat. The wolf let the prince ride on him,
> instead, and showed him the giant's castle, telling him to go inside.
> The prince was reluctant fearing the wrath of the giant, but the wolf
> consoled him. The wolf persuaded the prince to enter the castle for
> there he would encounter not the giant, but the princess the giant
> kept prisoner.
>
> The princess was very beautiful and the prince wanted to know how he
> could kill the giant and set her and his family free. The princess
> said that there was no way, as the giant did not keep his heart in his
> body and therefore could not be killed. When the giant returned, the
> princess hid the prince, and asked the giant where he kept his heart.
> He told her that it was under the door sill. The prince and princess
> dug there the next day and found no heart. The princess strewed
> flowers over the door sill, and when the giant returned, told him that
> it was because his heart lay there. The giant admitted it wasn't there
> and told her it was in the cupboard. As before, the princess and the
> prince searched, to no avail; once again, the princess strewed
> garlands of flowers on the cupboard and told the giant it was because
> his heart was there. Thereupon the giant revealed to her that, in
> fact, a distant lake held an island upon which there sat a church;
> within the church was a well where a duck swam; in the duck's nest was
> an egg; and in the egg was the giant's heart.
>
> The prince rode to the lake, where the wolf jumped to the island. The
> prince called upon the raven he had saved from starvation, and it
> brought him the keys to the church. Once inside, he coaxed the duck to
> him, but it dropped the egg in the well first, and the prince called
> on the salmon to get him the egg. The wolf told him to squeeze the
> egg, and when he did, the giant screamed. The wolf told him to squeeze
> it again, and the giant promised anything if he would spare his life.
> The prince told him to change his brothers and their brides back to
> life, and the giant did so. Then the prince squeezed the egg into two
> and went home with the giant's captive princess as his bride;
> accompanying him were his brothers and their brides, and the king
> rejoiced.

There are other examples listed under wikipedia's [See Also](https://en.wikipedia.org/wiki/The_Giant_Who_Had_No_Heart_in_His_Body#See_also).

Intermixing these could provide some better variation. Not much, but a semi-palateable amount?

for example (and probably one I saw last year, whilst poking hard at Russian Wonder Tales):

## Koschei the Deathless


https://en.wikipedia.org/wiki/Koschei

> Koschei cannot be killed by conventional means targeting his body. His
> soul (or death) is hidden separate from his body inside a needle,
> which is in an egg, which is in a duck, which is in a hare, which is
> in an iron chest (sometimes the chest is crystal and/or gold), which
> is buried under a green oak tree, which is on the island of Buyan in
> the ocean. As long as his soul is safe, he cannot die. If the chest is
> dug up and opened, the hare will bolt away; if it is killed, the duck
> will emerge and try to fly off. Anyone possessing the egg has Koschei
> in their power. He begins to weaken, becomes sick, and immediately
> loses the use of his magic. If the egg is tossed about, he likewise is
> flung around against his will. If the needle is broken, Koschei will
> die.
