package com.area.api.dto;

public class ParticipantsDTO {
	private Long participantId;
    private String type;
    private String actName;
    private String studentName;
    private String teacherName;
    
    public ParticipantsDTO(Long participantId, String type, String actName, String studentName, String teacherName) {
        this.participantId = participantId;
        this.type = type;
        this.actName = actName;
        this.studentName = studentName;
        this.teacherName = teacherName;
    }

	public ParticipantsDTO() {
	}

	public Long getParticipantId() {
		return participantId;
	}

	public void setParticipantId(Long participantId) {
		this.participantId = participantId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getActName() {
		return actName;
	}

	public void setActName(String actName) {
		this.actName = actName;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
    
}
