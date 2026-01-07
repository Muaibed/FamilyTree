UPDATE "Family"
 SET "membersCount" = (    
     SELECT COALESCE(COUNT(*), 0)
     FROM "Person"      
     WHERE "Person"."familyId" = "Family"."id"  
 );

 UPDATE "User"
 SET "recordsCount" = (    
     SELECT COALESCE(SUM("membersCount"), 0)
     FROM "Family"      
     WHERE "Family"."ownerId" = "User"."id"  
 );