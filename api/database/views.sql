CREATE OR REPLACE VIEW vwPhotoUser AS (
  SELECT a.idUser as idUser, p.* 
	FROM photo p
  JOIN album a ON a.idAlbum = p.idAlbum
  WHERE a.status = 0
  AND p.status = 0
)