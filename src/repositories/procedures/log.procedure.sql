create or replace function insert_match_information(created_at bigint,player1Id int, player2Id int, typeMatch int, messageLog text, botId int) 
returns void 
language sql
as $func$
	insert into "log"."histories" (created_at,player1_id, player2_id, type_match, message_log, bot_id) VALUES ($1, $2, $3, $4, $5, $6);
$func$