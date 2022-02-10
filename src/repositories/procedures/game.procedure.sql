create or replace function get_bot_by_id(botId int)
returns setof "public"."bot"
language sql
as $func$
	select * from "public"."bot" b where b.id = $1
$func$


create or replace function get_player_skill_by_id(playerId int)
returns table (player_id integer, user_name varchar, skill_id integer, skill_name varchar, skill_damage numeric)
language sql
as $func$
	select pl.id player_id, pl.user_name user_name, s.id skill_id, s.skill_name skill_name, s.damage skill_damage 
	from "public"."players" pl
	inner join "public"."playerskill" as ps
		on pl.id = ps.player_id
		and pl.id = $1
	inner join "public"."skills" s
		ON ps.skill_id  = s.id
$func$;